<?php
// Script to update "Vídeos" category to "Garage"
// Can be run via CLI or browser.
require_once(dirname(__FILE__) . '/wp-load.php');

$old_slug = 'videos';
$new_slug = 'garage';
$new_name = 'Garage';

$descriptions = [
    'pt' => "Todo o clássico tem dois destinos: a estrada ou o esquecimento. A Garage existe para inclinar a balança para o lado certo. Aqui não há fichas frias, só histórias de carros que foram alguém, à procura de quem os volte a pôr a andar.",
    'en' => "Every classic has two destinies: the road or oblivion. Garage exists to tip the balance to the right side. Here there are no cold spec sheets, only stories of cars that were someone's, looking for someone to get them running again.",
    'es' => "Todo clásico tiene dos destinos: la carretera o el olvido. Garage existe para inclinar la balanza hacia el lado correcto. Aquí no hay frías fichas técnicas, solo historias de coches que fueron de alguien, buscando a quien vuelva a ponerlos en marcha.",
    'it' => "Ogni classico ha due destini: la strada o l'oblio. Garage esiste per far pendere la bilancia dalla parte giusta. Qui non ci sono fredde schede tecniche, ma solo storie di auto che sono appartenute a qualcuno, alla ricerca di chi le rimetta in moto."
];

// In a standard WP setup with Polylang, we might need to find all languages.
if (function_exists('pll_languages_list')) {
    $langs = pll_languages_list();
    foreach ($langs as $lang) {
        $term_id = pll_get_term(get_category_by_slug($old_slug)->term_id ?? 0, $lang);
        if (!$term_id) {
            // Try to find if 'garage' already exists or just 'videos' in this lang
            $term = get_term_by('slug', $old_slug . '-' . $lang, 'category');
            if (!$term) {
                $term = get_term_by('slug', $old_slug, 'category');
            }
            if ($term) $term_id = $term->term_id;
        }

        if ($term_id) {
            $desc = $descriptions[$lang] ?? $descriptions['en'];
            
            wp_update_term($term_id, 'category', [
                'name' => $new_name,
                'slug' => $new_slug . '-' . $lang,
                'description' => $desc
            ]);
            echo "Updated category for language: $lang\n";
        } else {
            echo "Could not find category for language: $lang\n";
        }
    }
} else {
    // Standard WP without Polylang active in this context or simple setup
    $term = get_category_by_slug($old_slug);
    if ($term) {
        wp_update_term($term->term_id, 'category', [
            'name' => $new_name,
            'slug' => $new_slug,
            'description' => $descriptions['pt']
        ]);
        echo "Updated single category.\n";
    } else {
        echo "Category 'videos' not found.\n";
    }
}

// Clean term cache
clean_term_cache('', 'category');
echo "Done.\n";
