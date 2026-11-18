// 1. Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// 2. Анимация появления элементов при скролле (Reveal)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            if (entry.target.querySelector('.result__num[data-target]')) {
                animateCounter(entry.target.querySelector('.result__num[data-target]'));
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});
revealElements.forEach(el => revealObserver.observe(el));

// 3. Анимация счетчика
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 1500;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target + (target === 100 ? '%' : '+');
        }
    };
    updateCounter();
}

// 4. Изменение шапки при скролле
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 5. Бургер-меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// 6. Логика формы записи с модальным окном
const bookingForm = document.getElementById('bookingForm');
const sendModal = document.getElementById('sendModal');
const modalClose = document.getElementById('modalClose');

if (bookingForm && sendModal) {
    const nameInput = document.getElementById('booking-name');
    const phoneInput = document.getElementById('booking-phone');
    const interestSelect = document.getElementById('booking-interest');

    function getFormData() {
        return {
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            interest: interestSelect.value
        };
    }

    function validateForm() {
        const data = getFormData();
        if (!data.name || !data.phone) {
            alert('Пожалуйста, заполните имя и телефон.');
            return false;
        }
        return true;
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) return;
        sendModal.classList.add('active');
    });

    if (modalClose) {
        modalClose.addEventListener('click', function() {
            sendModal.classList.remove('active');
        });
    }
    sendModal.addEventListener('click', function(e) {
        if (e.target === sendModal) {
            sendModal.classList.remove('active');
        }
    });

    document.getElementById('modal-wa').addEventListener('click', function() {
        const data = getFormData();
        const text = `Здравствуйте! Хочу записаться на занятие.%0AИмя: ${encodeURIComponent(data.name)}%0AТелефон: ${encodeURIComponent(data.phone)}%0AИнтерес: ${encodeURIComponent(data.interest)}`;
        window.open(`https://wa.me/79105293209?text=${text}`, '_blank');
        sendModal.classList.remove('active');
    });

    document.getElementById('modal-tg').addEventListener('click', function() {
        const data = getFormData();
        const text = `Здравствуйте! Хочу записаться на занятие.%0AИмя: ${encodeURIComponent(data.name)}%0AТелефон: ${encodeURIComponent(data.phone)}%0AИнтерес: ${encodeURIComponent(data.interest)}`;
        window.open(`https://t.me/+79105293209?text=${text}`, '_blank');
        sendModal.classList.remove('active');
    });

    document.getElementById('modal-email').addEventListener('click', function() {
        const data = getFormData();
        const subject = encodeURIComponent('Заявка на занятие с сайта');
        const body = encodeURIComponent(`Имя: ${data.name}\nТелефон: ${data.phone}\nИнтерес: ${data.interest}`);
        window.location.href = `mailto:olga.znt2009@gmail.com?subject=${subject}&body=${body}`;
        sendModal.classList.remove('active');
    });
}
