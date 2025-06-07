<?php
/**
 * Timeline Process - Visual Component Only
 * 
 * Shortcode: [timeline_process steps="5"]
 */

// Enregistrement du shortcode
function timeline_process_shortcode($atts) {
    // Attributs par défaut
    $atts = shortcode_atts(
        array(
            'steps' => 5, // Nombre d'étapes par défaut
        ),
        $atts,
        'timeline_process'
    );
    
    $steps = intval($atts['steps']);
    
    // Début du buffer de sortie
    ob_start();
    ?>
    <div class="timeline-container">
        <div class="timeline-line">
            <div class="timeline-fill"></div>
        </div>
        
        <?php for ($i = 1; $i <= $steps; $i++) : ?>
            <div class="timeline-bullet" data-step="<?php echo $i; ?>">
                <?php echo $i; ?>
            </div>
        <?php endfor; ?>
    </div>
    <?php
    
    // Retourner le contenu du buffer
    return ob_get_clean();
}
add_shortcode('timeline_process', 'timeline_process_shortcode');

// Enregistrement des styles et scripts
function timeline_process_enqueue_assets() {
    // Vérifier si le shortcode est présent sur la page
    global $post;
    if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'timeline_process')) {
        wp_enqueue_style(
            'timeline-process-style',
            plugin_dir_url(__FILE__) . 'css/timeline.css',
            array(),
            '1.0'
        );
        
        wp_enqueue_script(
            'timeline-process-script',
            plugin_dir_url(__FILE__) . 'js/timeline.js',
            array('jquery'),
            '1.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'timeline_process_enqueue_assets');

// Ajout de l'attribut personnalisé pour les blocs Kadence
function timeline_process_register_block_attributes() {
    wp_enqueue_script(
        'timeline-process-block-attributes',
        plugin_dir_url(__FILE__) . 'js/block-attributes.js',
        array('wp-blocks', 'wp-dom-ready', 'wp-edit-post'),
        '1.0',
        true
    );
}
add_action('enqueue_block_editor_assets', 'timeline_process_register_block_attributes');
