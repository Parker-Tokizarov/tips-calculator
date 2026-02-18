// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();
document.body.style.backgroundColor = tg.backgroundColor;
tg.onEvent('themeChanged', function() {
    document.body.style.backgroundColor = tg.backgroundColor;
});

// Получаем элементы интерфейса
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');
const tipSlider = document.getElementById('tipSlider');
const tipValue = document.getElementById('tipValue');
const totalSpan = document.getElementById('total');
const perPersonSpan = document.getElementById('perPerson');

let currentTip = 15;

// Настройка главной кнопки Telegram
const mainButton = tg.MainButton;
mainButton.setText('Рассчитать');
mainButton.show();

// Обработка кнопок с процентами
tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tipButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTip = parseInt(btn.dataset.tip);
        tipSlider.value = currentTip;
        tipValue.textContent = currentTip + '%';
    });
});

// Обработка слайдера
tipSlider.addEventListener('input', () => {
    currentTip = parseInt(tipSlider.value);
    tipValue.textContent = currentTip + '%';
    tipButtons.forEach(b => b.classList.remove('active'));
});

// Функция расчёта
function calculate() {
    const bill = parseFloat(billInput.value) || 0;
    let people = parseInt(peopleInput.value) || 1;
    if (people < 1) people = 1;
    
    const tipAmount = bill * (currentTip / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    totalSpan.textContent = total.toFixed(2);
    perPersonSpan.textContent = perPerson.toFixed(2);
}

calculate(); // начальный расчёт

// Обработка нажатия на главную кнопку Telegram
mainButton.onClick(function() {
    calculate(); // обновляем расчёт на случай, если пользователь ничего не менял после открытия
    
    // Собираем данные для отправки
    const data = {
        bill: parseFloat(billInput.value) || 0,
        people: parseInt(peopleInput.value) || 1,
        tip: currentTip,
        total: totalSpan.textContent,
        perPerson: perPersonSpan.textContent
    };
    
    // Отправляем данные боту (именно через эту функцию)
    tg.sendData(JSON.stringify(data));
    
    // Меняем состояние кнопки
    mainButton.setText('Отправлено!');
    mainButton.disable();
    
    // Закрываем приложение через 1.5 секунды
    setTimeout(() => {
        tg.close();
    }, 1500);
});