// Добавление слушателя события 'change' для элемента с ID 'styleToggle'
document.getElementById('styleToggle').addEventListener('change', function() {
    const controls = document.getElementById('styleControls'); // Получение элемента управления стилями по ID
    // Установка видимости элемента управления в зависимости от состояния переключателя
    controls.style.display = this.checked ? 'block' : 'none'; // Если переключатель включен, показать, иначе скрыть
});

// Добавление слушателя события 'change' для элемента с ID 'fontSize'
document.getElementById('fontSize').addEventListener('change', function() {
    // Изменение размера шрифта для всего документа на значение, выбранное пользователем
    document.body.style.fontSize = this.value; // Установка размера шрифта, равного значению из элемента выбора
});

// Добавление слушателя события 'input' для элемента с ID 'textColor'
document.getElementById('textColor').addEventListener('input', function() {
    // Изменение цвета текста для всего документа на значение, выбранное пользователем
    document.body.style.color = this.value; // Установка цвета текста, равного текущему значению элемента ввода
});

// Добавление слушателя события 'input' для элемента с ID 'bgColor'
document.getElementById('bgColor').addEventListener('input', function() {
    // Изменение цвета фона для всего документа на значение, выбранное пользователем
    document.body.style.backgroundColor = this.value; // Установка цвета фона, равного текущему значению элемента ввода
});