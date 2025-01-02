// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker enregistré avec succès:', registration.scope);
            })
            .catch(error => {
                console.log('Échec de l\'enregistrement du Service Worker:', error);
            });
    });
}

// Animations au scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.stat-card, .testimonial-card').forEach((el) => {
    observer.observe(el);
});

// Effet parallaxe moderne
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * 0.01);
    const moveY = (e.clientY * 0.01);
    
    document.querySelector('.hero-pattern').style.transform = 
        `translate(${moveX}px, ${moveY}px)`;
});

// Animation des nombres
const animateValue = (element, start, end, duration) => {
    let current = start;
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
};

// Smooth scroll moderne
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
