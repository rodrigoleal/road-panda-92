<?php
require 'wp-load.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) die(json_encode(['success' => false, 'error' => 'No JSON']));

$ptPostId = (int) $data['pt_post_id'];
$title = $data['title'];
$content = $data['content'];
$excerpt = isset($data['excerpt']) ? $data['excerpt'] : '';
$langCode = $data['lang_code'];

$new_post = array(
    'post_title'    => $title,
    'post_content'  => $content,
    'post_excerpt'  => $excerpt,
    'post_status'   => 'publish',
    'post_type'     => 'post',
    'post_author'   => 1
);

$trans_id = wp_insert_post($new_post, true);

if (!is_wp_error($trans_id)) {
    // 1. Language definition
    pll_set_post_language($trans_id, $langCode);
    
    // 2. Link translation correctly! Preserve existing translations of the same group.
    $existing_translations = pll_get_post_translations($ptPostId);
    $existing_translations[$langCode] = $trans_id;
    pll_save_post_translations($existing_translations);
    
    // 3. Global Thumbnail sync
    $img_id = get_post_thumbnail_id($ptPostId);
    if ($img_id) {
        set_post_thumbnail($trans_id, $img_id);
    }
    
    // 4. Categories Sync
    $cats = wp_get_post_categories($ptPostId);
    $trans_cats = [];
    foreach ($cats as $pt_cat) {
        $trans_term_id = pll_get_term($pt_cat, $langCode);
        if ($trans_term_id) {
            $trans_cats[] = (int) $trans_term_id;
        }
    }
    if (!empty($trans_cats)) {
        wp_set_post_categories($trans_id, $trans_cats, false);
    }
    
    clean_post_cache($trans_id);
    
    echo json_encode(['success' => true, 'id' => $trans_id]);
} else {
    echo json_encode(['success' => false, 'error' => $trans_id->get_error_message()]);
}
?>
