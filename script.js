// Получаем элементы
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');
const tipSlider = document.getElementById('tipSlider');
const tipValue = document.getElementById('tipValue');
const calculateBtn = document.getElementById('calculateBtn');
const totalSpan = document.getElementById('total');
const perPersonSpan = document.getElementById('perPerson');

let currentTip = 15; // по умолчанию

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
    
    // Снимаем активный класс с кнопок, т.к. выбрано нестандартное значение
    tipButtons.forEach(b => b.classList.remove('active'));
});

// Функция расчёта
function calculate() {
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    
    const tipAmount = bill * (currentTip / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    
    totalSpan.textContent = total.toFixed(2);
    perPersonSpan.textContent = perPerson.toFixed(2);
}

// Обработка кнопки Рассчитать
calculateBtn.addEventListener('click', calculate);

// Первоначальный расчёт
calculate();