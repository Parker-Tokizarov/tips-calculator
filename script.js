// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

// Расширяем приложение на всю доступную высоту
tg.expand();

// Устанавливаем цвет фона в соответствии с темой Telegram
document.body.style.backgroundColor = tg.backgroundColor;

// Слушаем изменение темы (если пользователь переключит тему)
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

let currentTip = 15; // текущий процент чаевых

// Настройка главной кнопки Telegram
const mainButton = tg.MainButton;
mainButton.setText('Рассчитать');
mainButton.show(); // Показываем кнопку сразу

// Обработка кнопок с процентами
tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
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
    
    // Снимаем активный класс с кнопок (выбрано нестандартное значение)
    tipButtons.forEach(b => b.classList.remove('active'));
});

// Функция расчёта
function calculate() {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    
    if (people < 1) peopleInput.value = 1; // защита от деления на ноль
    
    const tipAmount = bill * (currentTip / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    totalSpan.textContent = total.toFixed(2);
    perPersonSpan.textContent = perPerson.toFixed(2);
}

// Выполняем расчёт при загрузке (чтобы показать начальные значения)
calculate();

// Обработка нажатия на главную кнопку Telegram
mainButton.onClick(function() {
    calculate(); // обновляем расчёт
    
    // Меняем состояние кнопки: показываем, что результат готов
    mainButton.setText('Готово!');
    mainButton.disable(); // Делаем кнопку неактивной
    
    // Через 1.5 секунды закрываем приложение
    setTimeout(() => {
        tg.close();
    }, 1500);
});