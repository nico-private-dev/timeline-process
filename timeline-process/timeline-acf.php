<?php
/**
 * Timeline Process - Version ACF Repeater
 */

// Shortcode pour afficher la timeline
function timeline_process_acf_shortcode($atts) {
    // Extraire les attributs
    $atts = shortcode_atts(array(
        'page_id' => get_the_ID(), // ID de la page par défaut
    ), $atts);
    
    // Récupérer les étapes du repeater ACF
    $steps = get_field('etape_timeline', $atts['page_id']);
    
    // Si aucune étape n'est définie, retourner un message
    if (!$steps || empty($steps)) {
        return '<p>Aucune étape définie pour la timeline.</p>';
    }
    
    // Enregistrer les styles et scripts
    wp_enqueue_style('timeline-process-acf-style', get_stylesheet_directory_uri() . '/timeline-process/css/timeline-acf.css', array(), '1.0');
    wp_enqueue_script('timeline-process-acf-script', get_stylesheet_directory_uri() . '/timeline-process/js/timeline-acf.js', array(), '1.0', true);
    
    // Début du buffer de sortie
    ob_start();
    ?>
    <div class="timeline-process">
        <div class="timeline-container">
            <div class="timeline-line">
                <div class="timeline-fill"></div>
            </div>
            <div class="timeline-bullets">
                <?php foreach ($steps as $index => $step) : ?>
                    <div class="timeline-bullet" data-step="<?php echo $index + 1; ?>"></div>
                <?php endforeach; ?>
            </div>
        </div>
        
        <div class="timeline-content">
            <?php foreach ($steps as $index => $step) : ?>
                <div class="timeline-step" data-timeline-step="<?php echo $index + 1; ?>">
                    <div class="timeline-step-inner">
                        <div class="timeline-step-content">
                            <h3 class="timeline-step-title"><?php echo esc_html($step['titre_etape']); ?></h3>
                            <div class="timeline-step-text">
                                <?php echo $step['contenu_etape']; ?>
                            </div>
                        </div>
                        
                        <?php if (!empty($step['image_etape'])) : ?>
                            <div class="timeline-step-image">
                                <?php echo wp_get_attachment_image($step['image_etape'], 'large'); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
    
    // Retourner le contenu du buffer
    return ob_get_clean();
}
add_shortcode('timeline_process_acf', 'timeline_process_acf_shortcode');
