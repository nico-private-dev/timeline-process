/**
 * Timeline Process - Script pour la partie visuelle et interaction
 */
jQuery(document).ready(function($) {
    // Sélection des éléments
    const $bullets = $('.timeline-bullet');
    const $lineFill = $('.timeline-fill');
    const $timelineContainer = $('.timeline-container');
    
    // Sélection des blocs de contenu associés (avec attribut data-timeline-step)
    const $contentBlocks = $('[data-timeline-step]');
    
    // Hauteur totale pour le calcul de progression
    const getTimelineHeight = () => {
        // Utiliser la hauteur du conteneur parent qui contient à la fois la timeline et le contenu
        const $parent = $timelineContainer.parent();
        return $parent.height() - $timelineContainer.height();
    };
    
    // Mise à jour de la timeline au scroll
    const updateTimeline = () => {
        // Point milieu de l'écran
        const viewportMiddle = $(window).scrollTop() + $(window).height() / 2;
        const containerTop = $timelineContainer.offset().top;
        
        // Calcul du pourcentage de progression
        let progress = (viewportMiddle - containerTop) / getTimelineHeight();
        progress = Math.max(0, Math.min(1, progress)); // Limiter entre 0 et 1
        
        // Mise à jour de la hauteur de remplissage
        $lineFill.css('height', (progress * 100) + '%');
        
        // Mise à jour des bullets actifs
        $bullets.each(function() {
            const $bullet = $(this);
            const step = $bullet.data('step');
            const $associatedContent = $contentBlocks.filter('[data-timeline-step="' + step + '"]');
            
            if ($associatedContent.length) {
                const contentTop = $associatedContent.offset().top;
                
                if (viewportMiddle > contentTop) {
                    $bullet.addClass('active');
                } else {
                    $bullet.removeClass('active');
                }
            }
        });
    };
    
    // Clic sur un bullet pour scroller vers le contenu associé
    $bullets.on('click', function() {
        const step = $(this).data('step');
        const $targetContent = $contentBlocks.filter('[data-timeline-step="' + step + '"]');
        
        if ($targetContent.length) {
            // Scroll vers le contenu avec animation
            $('html, body').animate({
                scrollTop: $targetContent.offset().top - 100 // Offset pour meilleure visibilité
            }, 800);
        }
    });
    
    // Ajouter suffisamment d'espace en bas si nécessaire
    const addScrollSpace = () => {
        // Vérifier si le dernier bloc de contenu est suffisamment bas
        const $lastContent = $contentBlocks.last();
        if ($lastContent.length) {
            const lastContentBottom = $lastContent.offset().top + $lastContent.height();
            const windowHeight = $(window).height();
            const documentHeight = $(document).height();
            
            // Si le dernier contenu est trop proche de la fin du document
            if (documentHeight - lastContentBottom < windowHeight / 2) {
                $('<div>').css('height', '50vh').appendTo('body');
            }
        }
    };
    
    // Initialisation
    addScrollSpace();
    $(window).on('scroll', updateTimeline);
    $(window).on('resize', updateTimeline);
    
    // Première mise à jour après chargement complet
    $(window).on('load', function() {
        setTimeout(updateTimeline, 100);
    });
});
