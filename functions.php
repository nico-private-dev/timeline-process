<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// Inclusion du fichier Timeline Process ACF
require_once get_stylesheet_directory() . '/timeline-process/timeline-acf.php';

// Import Splide
function enqueue_splide_assets() {
    wp_enqueue_style('splide-css', 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css');
    wp_enqueue_script('splide-js', 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js', array(), null, true);
    wp_enqueue_script('splide-auto-scroll', 'https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-auto-scroll@0.5.3/dist/js/splide-extension-auto-scroll.min.js');
}
add_action('wp_enqueue_scripts', 'enqueue_splide_assets');

// Import des fichiers du thème
function enqueue_graphique_design_home_assets() {
    if ( is_front_page() ) {
        // css
        wp_enqueue_style('graphique-home-style', get_stylesheet_directory_uri() . '/graphique-design-home/css/graphique.css', array(), '1.0');
        wp_enqueue_style('index', get_stylesheet_directory_uri() . '/css/index.css', array(), '1.0');
        // js
        wp_enqueue_script('graphique-home-script', get_stylesheet_directory_uri() . '/graphique-design-home/js/graphique.js', array('jquery'), '1.0', true);
        wp_enqueue_script('tools', get_stylesheet_directory_uri() . '/js/tools.js', array('splide-js'), null, true);
    }
}
add_action('wp_enqueue_scripts', 'enqueue_graphique_design_home_assets');

// Autres fonctions du thème...