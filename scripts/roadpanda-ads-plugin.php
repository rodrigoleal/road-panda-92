<?php
/**
 * Plugin Name: Road Panda - Ad Management
 * Description: Gerador de Espaços Publicitários e Metadados para o Headless (GraphQL)
 * Version: 1.0
 * Author: Antigravity
 */

// 1. Register Post Type
add_action('init', function() {
    register_post_type('ad', [
        'labels' => [
            'name' => 'Publicidade',
            'singular_name' => 'Anúncio',
            'add_new' => 'Adicionar Anúncio',
            'add_new_item' => 'Adicionar Novo Anúncio',
            'edit_item' => 'Editar Anúncio',
            'all_items' => 'Todos os Anúncios',
        ],
        'public' => true,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_graphql' => true,
        'graphql_single_name' => 'ad',
        'graphql_plural_name' => 'ads',
        'menu_icon' => 'dashicons-megaphone',
        'supports' => ['title', 'thumbnail'],
    ]);

    // Create Newsletter Table if not exists
    global $wpdb;
    $table_name = $wpdb->prefix . 'roadpanda_subscribers';
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
        email varchar(100) NOT NULL,
        PRIMARY KEY  (id),
        UNIQUE KEY email (email)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
});

// 2. Add Meta Box in WP Admin
add_action('add_meta_boxes', function() {
    add_meta_box('ad_settings', 'Configurações do Anúncio', 'roadpanda_ad_meta_box_html', 'ad', 'normal', 'high');
});

function roadpanda_ad_meta_box_html($post) {
    $placement = get_post_meta($post->ID, '_ad_placement', true);
    $linkUrl = get_post_meta($post->ID, '_ad_link_url', true);
    wp_nonce_field('roadpanda_ad_save', 'roadpanda_ad_meta_nonce');
    ?>
    <p>
        <label for="ad_placement"><strong>Onde exibir este anúncio?</strong></label><br>
        <select name="ad_placement" id="ad_placement" style="width:100%; max-width:400px; padding: 5px;">
            <option value="">-- Selecione o Espaço --</option>
            <option value="home-top" <?php selected($placement, 'home-top'); ?>>Topo da Página Inicial (home-top)</option>
            <option value="category-top" <?php selected($placement, 'category-top'); ?>>Topo das Categorias (category-top)</option>
            <option value="latest-top" <?php selected($placement, 'latest-top'); ?>>Topo das Últimas (latest-top)</option>
            <option value="hero-sidebar" <?php selected($placement, 'hero-sidebar'); ?>>Lateral do Hero (hero-sidebar)</option>
            <option value="infinite-feed" <?php selected($placement, 'infinite-feed'); ?>>Mural Infinito (infinite-feed)</option>
            <option value="article-sidebar" <?php selected($placement, 'article-sidebar'); ?>>Barra Lateral do Artigo (article-sidebar)</option>
        </select>
    </p>
    <p>
        <label for="ad_link_url"><strong>Link de Destino (URL):</strong></label><br>
        <input type="url" name="ad_link_url" id="ad_link_url" value="<?php echo esc_attr($linkUrl); ?>" style="width:100%; padding: 5px;" placeholder="https://link.com" />
    </p>
    <?php
}

// 3. Save Meta Box Data
add_action('save_post', function($post_id) {
    if (!isset($_POST['roadpanda_ad_meta_nonce']) || !wp_verify_nonce($_POST['roadpanda_ad_meta_nonce'], 'roadpanda_ad_save')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['ad_placement'])) {
        update_post_meta($post_id, '_ad_placement', sanitize_text_field($_POST['ad_placement']));
    }
    if (isset($_POST['ad_link_url'])) {
        update_post_meta($post_id, '_ad_link_url', esc_url_raw($_POST['ad_link_url']));
    }
});

// 4. Expose to WPGraphQL
add_action('graphql_register_types', function() {
    register_graphql_field('Ad', 'placement', [
        'type' => 'String',
        'description' => 'The placement area for the ad',
        'resolve' => function($post) {
            return get_post_meta($post->ID, '_ad_placement', true);
        }
    ]);

    register_graphql_field('Ad', 'linkUrl', [
        'type' => 'String',
        'description' => 'The destination link URL for the ad',
        'resolve' => function($post) {
            return get_post_meta($post->ID, '_ad_link_url', true);
        }
    ]);
});

// 5. Newsletter REST API Endpoint
add_action('rest_api_init', function () {
    register_rest_route('roadpanda/v1', '/subscribe', [
        'methods' => 'POST',
        'callback' => 'roadpanda_handle_subscription',
        'permission_callback' => '__return_true'
    ]);
});

function roadpanda_handle_subscription($request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'roadpanda_subscribers';
    
    $params = $request->get_json_params();
    $email = sanitize_email($params['email']);

    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'Email inválido', ['status' => 400]);
    }

    // Check if already exists
    $exists = $wpdb->get_var($wpdb->prepare("SELECT id FROM $table_name WHERE email = %s", $email));
    if ($exists) {
        return ['status' => 'success', 'message' => 'Email já subscrito.'];
    }

    $inserted = $wpdb->insert($table_name, [
        'time' => current_time('mysql'),
        'email' => $email
    ]);

    if ($inserted) {
        return ['status' => 'success', 'message' => 'Subscrição confirmada!'];
    }

    return new WP_Error('db_error', 'Erro ao guardar subscrição', ['status' => 500]);
}

// 6. Admin UI for Subscribers
add_action('admin_menu', function() {
    add_submenu_page(
        'edit.php?post_type=ad',
        'Subscritores Newsletter',
        'Subscritores',
        'manage_options',
        'roadpanda-subscribers',
        'roadpanda_subscribers_page'
    );
});

function roadpanda_subscribers_page() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'roadpanda_subscribers';
    
    // Handle Export
    if (isset($_GET['export']) && $_GET['export'] === 'csv') {
        roadpanda_export_subscribers();
        return;
    }

    $subscribers = $wpdb->get_results("SELECT * FROM $table_name ORDER BY time DESC");
    ?>
    <div class="wrap">
        <h1 class="wp-heading-inline">Subscritores da Newsletter</h1>
        <a href="?post_type=ad&page=roadpanda-subscribers&export=csv" class="page-title-action">Exportar CSV</a>
        <hr class="wp-header-end">

        <table class="wp-list-table widefat fixed striped mt-4">
            <thead>
                <tr>
                    <th class="manage-column">Email</th>
                    <th class="manage-column">Data de Subscrição</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($subscribers): foreach ($subscribers as $s): ?>
                    <tr>
                        <td><strong><?php echo esc_html($s->email); ?></strong></td>
                        <td><?php echo esc_html($s->time); ?></td>
                    </tr>
                <?php endforeach; else: ?>
                    <tr><td colspan="2">Nenhum subscritor encontrado.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}

function roadpanda_export_subscribers() {
    if (!current_user_can('manage_options')) return;
    
    global $wpdb;
    $table_name = $wpdb->prefix . 'roadpanda_subscribers';
    $subscribers = $wpdb->get_results("SELECT email, time FROM $table_name ORDER BY time DESC", ARRAY_A);

    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=subscritores-roadpanda.csv');
    
    $output = fopen('php://output', 'w');
    fputcsv($output, ['Email', 'Data']);
    
    foreach ($subscribers as $row) {
        fputcsv($output, $row);
    }
    exit;
}
