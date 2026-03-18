function copyIP() {
    const ip = 'starcraft.github.io';
    navigator.clipboard.writeText(ip).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Скопировано!';
        btn.style.background = '#00cc66';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '#0066ff';
        }, 2000);
    });
}

// Плавная прокрутка для якорей
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .mode-card, .crate-card, .stat-block').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Эффект параллакса для фона
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelector('.particles');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    particles.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
});

// Счетчики статистики (анимация цифр)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Запускаем анимацию цифр когда секция статистики видна
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                const value = parseInt(num.textContent);
                animateValue(num, 0, value, 2000);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelector('.statistics').forEach(el => statsObserver.observe(el));