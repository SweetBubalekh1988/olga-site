// ... (твои старые функции: плавная прокрутка, reveal, счётчик, бургер) ...

// === ЛОГИКА ДЛЯ ФОРМЫ ЗАПИСИ С МОДАЛЬНЫМ ОКНОМ ===
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

    // Открываем модальное окно при отправке формы
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateForm()) return;
        sendModal.classList.add('active');
    });

    // Закрытие модального окна
    modalClose.addEventListener('click', function() {
        sendModal.classList.remove('active');
    });
    sendModal.addEventListener('click', function(e) {
        if (e.target === sendModal) {
            sendModal.classList.remove('active');
        }
    });

    // Отправка в WhatsApp
    document.getElementById('modal-wa').addEventListener('click', function() {
        const data = getFormData();
        const text = `Здравствуйте! Хочу записаться на занятие.%0AИмя: ${encodeURIComponent(data.name)}%0AТелефон: ${encodeURIComponent(data.phone)}%0AИнтерес: ${encodeURIComponent(data.interest)}`;
        window.open(`https://wa.me/79105293209?text=${text}`, '_blank');
        sendModal.classList.remove('active');
    });

    // Отправка в Telegram
    document.getElementById('modal-tg').addEventListener('click', function() {
        const data = getFormData();
        const text = `Здравствуйте! Хочу записаться на занятие.%0AИмя: ${encodeURIComponent(data.name)}%0AТелефон: ${encodeURIComponent(data.phone)}%0AИнтерес: ${encodeURIComponent(data.interest)}`;
        window.open(`https://t.me/+79105293209?text=${text}`, '_blank');
        sendModal.classList.remove('active');
    });

    // Отправка на почту
    document.getElementById('modal-email').addEventListener('click', function() {
        const data = getFormData();
        const subject = encodeURIComponent('Заявка на занятие с сайта');
        const body = encodeURIComponent(`Имя: ${data.name}\nТелефон: ${data.phone}\nИнтерес: ${data.interest}`);
        window.location.href = `mailto:olga.znt2009@gmail.com?subject=${subject}&body=${body}`;
        sendModal.classList.remove('active');
    });
}
