<?php
require 'wp-load.php';

$cats = get_categories(['hide_empty' => false, 'lang' => '']);
foreach ($cats as $cat) {
    if (strpos($cat->slug, 'maquinas') !== false || strpos($cat->slug, 'video') !== false || strpos($cat->slug, 'encontros') !== false) {
        echo $cat->slug . " (" . $cat->term_id . "): " . $cat->count . " posts\n";
    }
}
?>
