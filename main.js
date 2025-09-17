/* =====================================================
   FORMATION BTP - ECONOMISTE DE LA CONSTRUCTION
   JavaScript principal pour la page d'accueil
   ===================================================== */

// ===== SMOOTH SCROLLING =====
function scrollToModules() {
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
        modulesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===== SCROLL REVEAL ANIMATION =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// ===== NAVIGATION FUNCTIONS =====
function showSection(sectionName) {
    // Cacher toutes les sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Désactiver tous les boutons d'onglet
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Afficher la section sélectionnée
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Activer l'onglet correspondant
    const activeTab = Array.from(tabs).find(tab => {
        const text = tab.textContent.toLowerCase();
        return (sectionName === 'mindmap' && text.includes('carte')) ||
               (sectionName === 'quiz' && text.includes('quiz')) ||
               (sectionName === 'pareto' && text.includes('pareto'));
    });
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// ===== TOGGLE DETAILS POUR CARTES MENTALES =====
function toggleDetails(branchId) {
    const details = document.getElementById(branchId);
    const branch = details?.parentElement;
    
    if (!details || !branch) {
        console.error(`Élément non trouvé: ${branchId}`);
        return;
    }
    
    // Si déjà ouvert, fermer
    if (details.classList.contains('show')) {
        details.classList.remove('show');
        branch.classList.remove('expanded');
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
    } else {
        // Fermer tous les autres détails (accordéon)
        const allDetails = document.querySelectorAll('.branch-details');
        const allBranches = document.querySelectorAll('.branch');
        
        allDetails.forEach(detail => {
            detail.classList.remove('show');
            detail.style.maxHeight = '0px';
            detail.style.opacity = '0';
        });
        allBranches.forEach(br => br.classList.remove('expanded'));
        
        // Ouvrir le détail sélectionné avec animation
        details.classList.add('show');
        branch.classList.add('expanded');
        details.style.maxHeight = details.scrollHeight + 'px';
        details.style.opacity = '1';
        
        // Scroll vers l'élément ouvert pour une meilleure UX
        setTimeout(() => {
            branch.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }
}

// ===== VÉRIFICATION DES LIENS =====
function checkModuleAvailability(href, button) {
    return new Promise((resolve, reject) => {
        // Animation de chargement
        const originalText = button.innerHTML;
        button.innerHTML = '<span>⏳</span><span>Vérification...</span>';
        button.style.pointerEvents = 'none';
        
        // Test de l'existence du fichier
        fetch(href, { method: 'HEAD' })
            .then(response => {
                button.innerHTML = originalText;
                button.style.pointerEvents = 'auto';
                
                if (response.ok) {
                    resolve(true);
                } else {
                    reject(`Module temporairement indisponible: ${response.status}`);
                }
            })
            .catch(error => {
                button.innerHTML = originalText;
                button.style.pointerEvents = 'auto';
                reject(`Erreur de connexion: ${error.message}`);
            });
    });
}

// ===== GESTION DES ERREURS GLOBALES =====
function handleGlobalErrors() {
    window.addEventListener('error', function(e) {
        console.warn('Erreur capturée:', e.message);
        
        // Affichage discret d'erreur pour l'utilisateur
        if (e.message.includes('module') || e.message.includes('fetch')) {
            showNotification('⚠️ Problème de chargement détecté. Rechargement de la page recommandé.', 'warning');
        }
    });
    
    // Gestion des promesses rejetées
    window.addEventListener('unhandledrejection', function(e) {
        console.warn('Promise rejetée:', e.reason);
    });
}

// ===== SYSTÈME DE NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Créer la notification si elle n'existe pas
    let notification = document.getElementById('global-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'global-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 12px;
            padding: 16px 20px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            z-index: 9999;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid #3b82f6;
        `;
        document.body.appendChild(notification);
    }
    
    // Définir les couleurs selon le type
    const colors = {
        'info': '#3b82f6',
        'success': '#10b981',
        'warning': '#f59e0b',
        'error': '#ef4444'
    };
    
    notification.style.borderLeftColor = colors[type] || colors.info;
    notification.innerHTML = message;
    
    // Afficher la notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Cacher après 5 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
    }, 5000);
}

// ===== PERFORMANCE MONITORING =====
function monitorPerformance() {
    // Mesurer le temps de chargement
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`⚡ Page chargée en ${Math.round(loadTime)}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️ Chargement lent détecté');
        }
    });
    
    // Observer les changements de visibilité
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            console.log('👁️ Page visible - Réactivation des animations');
            // Réactiver les animations si nécessaire
            revealOnScroll();
        }
    });
}

// ===== ACCESSIBILITÉ =====
function enhanceAccessibility() {
    // Gestion du focus au clavier
    document.addEventListener('keydown', function(e) {
        // Navigation par Tab améliorée
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Supprimer la classe lors d'un clic
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Skip links pour l'accessibilité
    const skipLink = document.createElement('a');
    skipLink.href = '#modules';
    skipLink.textContent = 'Passer au contenu principal';
    skipLink.style.cssText = `
        position: fixed;
        top: -40px;
        left: 6px;
        background: white;
        color: #1f2937;
        padding: 8px 12px;
        text-decoration: none;
        font-weight: 600;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== OPTIMISATION DES IMAGES =====
function optimizeImages() {
    // Observer les images pour le lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ===== INITIALISATION PRINCIPALE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Formation BTP - Initialisation...');
    
    // Initialisation des fonctionnalités
    handleGlobalErrors();
    monitorPerformance();
    enhanceAccessibility();
    optimizeImages();
    
    // Révéler les éléments au chargement
    setTimeout(() => {
        revealOnScroll();
    }, 100);
    
    // Animation des cartes modules au survol
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('coming-soon')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Gestion améliorée des liens vers les modules
    document.querySelectorAll('a[href^="modules/"]').forEach(link => {
        link.addEventListener('click', async function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            try {
                await checkModuleAvailability(href, this);
                // Si succès, naviguer vers le module
                window.location.href = href;
            } catch (error) {
                console.warn('Erreur module:', error);
                showNotification(`❌ ${error}`, 'error');
            }
        });
    });
    
    // Gestion du bouton CTA principal
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Ajouter un effet de ripple
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.5);
                pointer-events: none;
                animation: ripple 0.6s linear;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    console.log('✅ Formation BTP - Prête !');
    showNotification('🎉 Plateforme chargée avec succès !', 'success');
});

// ===== GESTION DU SCROLL =====
let ticking = false;

function handleScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            revealOnScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ===== GESTION DU RESIZE =====
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculer les positions après resize
        revealOnScroll();
    }, 250);
});

// ===== STYLES CSS DYNAMIQUES =====
const dynamicStyles = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
`;

// Injecter les styles dynamiques
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ===== EXPORT DES FONCTIONS GLOBALES =====
window.scrollToModules = scrollToModules;
window.showSection = showSection;
window.toggleDetails = toggleDetails;
window.showNotification = showNotification;
