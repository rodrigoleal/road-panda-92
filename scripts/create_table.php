<?php
/**
 * Script de emergência para criar a tabela de newsletter
 * Executar via: wp eval-file create_table.php
 */
global $wpdb;

$table_name = $wpdb->prefix . 'roadpanda_subscribers';
$charset_collate = $wpdb->get_charset_collate();

echo "A tentar criar tabela: $table_name\n";

$sql = "CREATE TABLE $table_name (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
    email varchar(100) NOT NULL,
    PRIMARY KEY  (id),
    UNIQUE KEY email (email)
) $charset_collate;";

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
$result = dbDelta($sql);

if (!empty($wpdb->last_error)) {
    echo "ERRO SQL: " . $wpdb->last_error . "\n";
} else {
    echo "Sucesso ou tabela já existente.\n";
    print_r($result);
}

// Verificação final
$check = $wpdb->get_var("SHOW TABLES LIKE '$table_name'");
if ($check === $table_name) {
    echo "CONFIRMADO: Tabela existe agora.\n";
} else {
    echo "FALHA: Tabela ainda não existe.\n";
}
