<?php
require 'wp-load.php';

$pt_posts = get_posts(['post_type' => 'post', 'lang' => 'pt', 'numberposts' => -1]);
$fixed_count = 0;

foreach ($pt_posts as $pt_post) {
    // Get PT categories
    $pt_cat_ids = wp_get_post_categories($pt_post->ID);
    
    // For each translation
    foreach (['en', 'es', 'it'] as $lang) {
        $trans_post_id = pll_get_post($pt_post->ID, $lang);
        if ($trans_post_id && $trans_post_id != $pt_post->ID) {
            
            $correct_cat_ids = [];
            foreach ($pt_cat_ids as $pt_cat_id) {
                $trans_cat_id = pll_get_term($pt_cat_id, $lang);
                if ($trans_cat_id) {
                    $correct_cat_ids[] = $trans_cat_id;
                }
            }
            
            if (!empty($correct_cat_ids)) {
                // Set the correct categories for the translated post
                wp_set_post_categories($trans_post_id, $correct_cat_ids, false);
                $fixed_count++;
            }
        }
    }
}
clean_post_cache($pt_post->ID);
clean_taxonomy_cache('category');
wp_cache_flush();

echo "Processed and re-linked categories for $fixed_count translated posts!\n";

// Optional: clean up unused duplicate categories
$cats = get_categories(['hide_empty' => true, 'lang' => '']);
foreach ($cats as $cat) {
    echo $cat->slug . " (" . $cat->term_id . "): " . $cat->count . " posts\n";
}
?>
