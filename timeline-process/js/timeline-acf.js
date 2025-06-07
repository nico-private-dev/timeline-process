/**
 * Timeline Process - Script pour la version ACF
 */
document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const timelineProcess = document.querySelector('.timeline-process');
    if (!timelineProcess) return; // Sortir si la timeline n'existe pas
    
    const bullets = document.querySelectorAll('.timeline-bullet');
    const lineFill = document.querySelector('.timeline-fill');
    const timelineContainer = document.querySelector('.timeline-container');
    const steps = document.querySelectorAll('.timeline-step');
    
    // Hauteur totale pour le calcul de progression
    const getTimelineHeight = () => {
        if (window.innerWidth <= 768) {
            // En mode mobile (horizontal)
            return document.documentElement.scrollWidth;
        } else {
            // En mode desktop (vertical)
            return document.documentElement.scrollHeight - window.innerHeight;
        }
    };
    
    // Mise à jour de la timeline au scroll
    const updateTimeline = () => {
        // Point milieu de l'écran
        const viewportMiddle = window.scrollY + window.innerHeight / 2;
        
        // Mise à jour des étapes actives et des bullets
        steps.forEach((step, index) => {
            const stepTop = step.getBoundingClientRect().top + window.scrollY;
            const stepBottom = stepTop + step.offsetHeight;
            
            // Vérifier si l'étape est visible dans la fenêtre
            if (viewportMiddle > stepTop && viewportMiddle < stepBottom) {
                step.classList.add('active');
                bullets[index].classList.add('active');
                
                // Calculer la progression pour la ligne de remplissage
                if (window.innerWidth <= 768) {
                    // En mode mobile (horizontal)
                    const containerLeft = timelineContainer.getBoundingClientRect().left;
                    const bulletLeft = bullets[index].getBoundingClientRect().left;
                    const progress = (bulletLeft - containerLeft) / timelineContainer.offsetWidth;
                    lineFill.style.width = (progress * 100) + '%';
                } else {
                    // En mode desktop (vertical)
                    const containerTop = timelineContainer.getBoundingClientRect().top + window.scrollY;
                    const bulletTop = bullets[index].getBoundingClientRect().top + window.scrollY;
                    const progress = (bulletTop - containerTop) / timelineContainer.offsetHeight;
                    lineFill.style.height = (progress * 100) + '%';
                }
            } else {
                step.classList.remove('active');
                bullets[index].classList.remove('active');
            }
        });
    };
    
    // Clic sur un bullet pour scroller vers le contenu associé
    bullets.forEach((bullet, index) => {
        bullet.addEventListener('click', function() {
            const targetStep = steps[index];
            if (targetStep) {
                // Scroll vers l'étape avec animation
                const targetPosition = targetStep.getBoundingClientRect().top + window.scrollY - 100;
                
                // Animation de scroll
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2; // Easing function
                    
                    window.scrollTo(0, startPosition + distance * easeProgress);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
    
    // Initialisation
    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('resize', updateTimeline);
    
    // Première mise à jour après chargement complet
    window.addEventListener('load', function() {
        setTimeout(updateTimeline, 100);
    });
    
    // Mise à jour initiale
    updateTimeline();
});
