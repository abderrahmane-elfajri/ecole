// État de la langue actuelle
let currentLang = 'fr';

// Fonction pour changer la langue
function toggleLanguage() {
    const html = document.documentElement;
    const langBtn = document.getElementById('langText');
    const footerLangBtn = document.getElementById('footerLangText');
    
    if (currentLang === 'fr') {
        currentLang = 'ar';
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        if (langBtn) langBtn.textContent = 'Français';
        if (footerLangBtn) footerLangBtn.textContent = 'Français';
        translatePage('ar');
    } else {
        currentLang = 'fr';
        html.setAttribute('lang', 'fr');
        html.setAttribute('dir', 'ltr');
        if (langBtn) langBtn.textContent = 'العربية';
        if (footerLangBtn) footerLangBtn.textContent = 'العربية';
        translatePage('fr');
    }
    
    // Sauvegarder la préférence dans localStorage
    localStorage.setItem('preferredLanguage', currentLang);
}

// Fonction pour traduire tous les éléments de la page
function translatePage(lang) {
    const elements = document.querySelectorAll('[data-fr][data-ar]');
    
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            // Vérifier si c'est un input/textarea pour le placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } 
            // Vérifier si c'est une option de select
            else if (element.tagName === 'OPTION') {
                element.textContent = text;
            }
            // Sinon, remplacer le contenu textuel
            else {
                element.textContent = text;
            }
        }
    });
}

// Menu hamburger pour mobile
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Bloquer le scroll du body quand le menu est ouvert
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Charger la langue préférée au chargement de la page
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        toggleLanguage();
    }
    
    // Animation au scroll
    observeElements();
    
    // Gestion du formulaire de contact
    setupContactForm();
    
    // Smooth scroll pour les liens de navigation
    setupSmoothScroll();
    
    // Gestion du menu mobile
    setupMobileMenu();
});

// Configuration du menu mobile
function setupMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scroll pour les liens d'ancrage
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Observer pour les animations au scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observer les éléments à animer
    const elementsToObserve = document.querySelectorAll(
        '.formation-card, .feature-item, .gallery-item, .testimonial-card, .info-item'
    );
    
    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Gestion du formulaire de contact
function setupContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const formation = document.getElementById('formation').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !phone || !formation || !message) {
                showAlert('error');
                return;
            }
            
            // Simuler l'envoi du formulaire
            console.log('Formulaire soumis:', { name, email, phone, formation, message });
            
            // Afficher un message de succès
            showAlert('success');
            
            // Réinitialiser le formulaire
            form.reset();
        });
    }
}

// Afficher un message d'alerte
function showAlert(type) {
    const messages = {
        success: {
            fr: 'Merci! Votre message a été envoyé avec succès. Nous vous répondrons bientôt.',
            ar: 'شكرا! تم إرسال رسالتك بنجاح. سنرد عليك قريبا.'
        },
        error: {
            fr: 'Veuillez remplir tous les champs du formulaire.',
            ar: 'يرجى ملء جميع حقول النموذج.'
        }
    };
    
    const message = messages[type][currentLang];
    const alertColor = type === 'success' ? '#27ae60' : '#e74c3c';
    
    // Créer l'élément d'alerte
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${alertColor};
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideDown 0.5s ease;
        max-width: 90%;
        text-align: center;
        font-weight: 600;
    `;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    // Retirer l'alerte après 5 secondes
    setTimeout(() => {
        alertDiv.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(alertDiv);
        }, 500);
    }, 5000);
}

// Ajouter les animations CSS pour les alertes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Effet parallax sur le hero au scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Changer l'apparence de la navbar au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
    }
});

// Galerie lightbox (optionnel)
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                createLightbox(img.src, img.alt);
            }
        });
    });
});

// Créer une lightbox pour afficher les images en grand
function createLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 15px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        animation: zoomIn 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: white;
        color: #e91e63;
        border: none;
        font-size: 40px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.transform = 'rotate(90deg)';
    });
    
    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.transform = 'rotate(0deg)';
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Fermer en cliquant n'importe où
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeBtn) {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        }
    });
    
    // Fermer avec la touche Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(lightbox)) {
                    document.body.removeChild(lightbox);
                }
            }, 300);
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Ajouter les animations CSS pour la lightbox
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(lightboxStyle);

console.log('Site web chargé avec succès! 🎉');