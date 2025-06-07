/**
 * Timeline Process - Script pour la version ACF
 */
document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.timeline-step');
    const lineFill = document.querySelector('.timeline-fill');
    const timelineSection = document.querySelector('.timeline-section');
    
    // Hauteur totale de la timeline (dernière étape + marge)
    const getTimelineHeight = () => {
        const lastStep = steps[steps.length - 1];
        return lastStep.offsetTop + lastStep.offsetHeight - timelineSection.offsetTop;
    };
    
    const updateTimeline = () => {
        // Point milieu de l'écran
        const viewportMiddle = window.scrollY + window.innerHeight / 2;
        const sectionTop = timelineSection.getBoundingClientRect().top + window.scrollY;
        
        // Calcul du pourcentage de progression
        let progress = (viewportMiddle - sectionTop) / getTimelineHeight();
        progress = Math.max(0, Math.min(1, progress)); // Limiter entre 0 et 1
        
        // Mise à jour de la hauteur de remplissage
        lineFill.style.height = (progress * 100) + '%';
        
        // Mise à jour des étapes actives
        steps.forEach((step) => {
            const stepTop = step.getBoundingClientRect().top + window.scrollY;
            if (viewportMiddle > stepTop) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    };

    // Ajouter suffisamment d'espace en bas pour permettre le défilement
    const addScrollSpace = () => {
        const footer = document.createElement('div');
        footer.style.height = '50vh';
        document.body.appendChild(footer);
    };
    
    addScrollSpace();
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    
    // Initialisation
    setTimeout(updateTimeline, 100);
});
