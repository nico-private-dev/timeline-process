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
    <div class="container-timeline">        
        <div class="timeline-section">
            <div class="timeline-line">
                <div class="timeline-fill"></div>
            </div>

            <?php foreach ($steps as $index => $step) : 
                $step_number = $index + 1;
            ?>
                <div class="timeline-step" data-step="<?php echo $step_number; ?>">
                    <div class="timeline-bullet"><?php echo $step_number; ?></div>
                    <div class="timeline-content">
                        <h2><?php echo esc_html($step['titre_etape']); ?></h2>
                        <?php echo wpautop($step['contenu_etape']); ?>
                        
                        <?php 
                        // Déboguer pour voir ce qui est stocké dans image_etape
                        // echo '<pre>'; print_r($step['image_etape']); echo '</pre>';
                        
                        if (!empty($step['image_etape'])) : 
                            // Si c'est un ID d'image
                            if (is_numeric($step['image_etape'])) {
                                $image_url = wp_get_attachment_image_url($step['image_etape'], 'large');
                            } 
                            // Si c'est déjà une URL ou un tableau
                            else if (is_array($step['image_etape'])) {
                                $image_url = $step['image_etape']['url'] ?? '';
                            }
                            // Si c'est une URL directe
                            else {
                                $image_url = $step['image_etape'];
                            }
                            
                            if ($image_url) :
                        ?>
                            <div class="timeline-image">
                                <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($step['titre_etape']); ?>">
                            </div>
                        <?php 
                            endif;
                        endif; 
                        ?>
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
