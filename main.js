document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Fermer le menu quand on clique sur un lien (mobile)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                if (menuToggle.querySelector('i.fa-times')) {
                    menuToggle.querySelector('i').classList.remove('fa-times');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        });
    });
    
    // Effet de scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animation au scroll pour les sections
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section, .card, .info-column');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };
    
    // Ajouter la classe pour l'animation CSS
    const sections = document.querySelectorAll('.section, .card, .info-column');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });
    
    // Déclencher l'animation au chargement et au scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Déclencher au chargement initial
    
    // Header sticky avec changement de style au scroll
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Gestion des accordéons FAQ
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            
            header.addEventListener('click', function() {
                // Fermer tous les autres accordéons
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.accordion-content').style.maxHeight = null;
                        otherItem.querySelector('.accordion-header i').classList.remove('fa-chevron-up');
                        otherItem.querySelector('.accordion-header i').classList.add('fa-chevron-down');
                    }
                });
                
                // Ouvrir/fermer l'accordéon actuel
                item.classList.toggle('active');
                const icon = header.querySelector('i');
                
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    content.style.maxHeight = null;
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
        });
        
        // Ouvrir le premier accordéon par défaut
        if (accordionItems.length > 0) {
            accordionItems[0].classList.add('active');
            const content = accordionItems[0].querySelector('.accordion-content');
            const icon = accordionItems[0].querySelector('.accordion-header i');
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    }
    
    // Validation de formulaire
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Validation email
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (isValid) {
                // Simuler l'envoi du formulaire
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                
                // Simuler une requête AJAX
                setTimeout(function() {
                    contactForm.reset();
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                    
                    // Réinitialiser le bouton après 3 secondes
                    setTimeout(function() {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                    }, 3000);
                    
                    // Afficher un message de confirmation
                    const formContainer = contactForm.closest('.contact-form-container');
                    if (formContainer) {
                        const successMsg = document.createElement('div');
                        successMsg.className = 'success-message';
                        successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.';
                        formContainer.appendChild(successMsg);
                        
                        // Faire disparaître le message après 5 secondes
                        setTimeout(function() {
                            successMsg.style.opacity = '0';
                            setTimeout(function() {
                                successMsg.remove();
                            }, 500);
                        }, 5000);
                    }
                }, 2000);
            } else {
                // Afficher un message d'erreur
                const errorMsg = document.querySelector('.form-error-message');
                if (!errorMsg) {
                    const newErrorMsg = document.createElement('div');
                    newErrorMsg.className = 'form-error-message';
                    newErrorMsg.innerHTML = 'Veuillez remplir tous les champs obligatoires correctement.';
                    contactForm.prepend(newErrorMsg);
                    
                    // Faire disparaître le message après 5 secondes
                    setTimeout(function() {
                        newErrorMsg.style.opacity = '0';
                        setTimeout(function() {
                            newErrorMsg.remove();
                        }, 500);
                    }, 5000);
                }
            }
        });
    }
    
    // Filtres pour la base de données et les actualités
    const filterTags = document.querySelectorAll('.filter-tags .tag');
    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Supprimer la classe active de tous les tags
                filterTags.forEach(t => t.classList.remove('active'));
                
                // Ajouter la classe active au tag cliqué
                this.classList.add('active');
                
                // Logique de filtrage (à implémenter selon les besoins)
                const filterValue = this.textContent.toLowerCase();
                console.log('Filtrer par:', filterValue);
                
                // Exemple de filtrage pour les actualités
                const newsCards = document.querySelectorAll('.news-card');
                if (newsCards.length > 0) {
                    newsCards.forEach(card => {
                        const category = card.querySelector('.news-category').textContent.toLowerCase();
                        if (filterValue === 'tous' || category === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
    
    // Ajouter des styles CSS pour les animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        header.scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            padding: 0.7rem 0;
        }
        
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .form-error-message, .success-message {
            padding: 10px 15px;
            margin-bottom: 20px;
            border-radius: 4px;
            transition: opacity 0.5s ease;
        }
        
        .form-error-message {
            background-color: #ffebee;
            color: #c62828;
            border-left: 4px solid #c62828;
        }
        
        .success-message {
            background-color: #e8f5e9;
            color: #2e7d32;
            border-left: 4px solid #2e7d32;
        }
        
        input.error, select.error, textarea.error {
            border: 1px solid #c62828;
            background-color: #ffebee;
        }
    `;
    document.head.appendChild(style);
});