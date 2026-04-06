<?php
require 'wp-load.php';
$cats = get_categories(['hide_empty' => false, 'lang' => '']);
foreach ($cats as $cat) {
    if (strpos($cat->slug, 'video') !== false) {
        echo $cat->slug . ' (' . $cat->term_id . '): ' . $cat->count . " posts\n";
        $posts = get_posts(['category' => $cat->term_id, 'numberposts' => -1, 'lang' => '']);
        foreach ($posts as $p) {
            $plang = pll_get_post_language($p->ID);
            echo '  -> [' . $plang . '] ' . $p->post_title . ' (ID:' . $p->ID . ")\n";
        }
    }
}
?>
