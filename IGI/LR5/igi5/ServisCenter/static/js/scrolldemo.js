// Ожидаем загрузки содержимого документа
document.addEventListener("DOMContentLoaded", function () {
    // Создаем массив с элементами фона, получая их по ID
    const bgParts = [
        document.getElementById('bg-part1'),
        document.getElementById('bg-part2'),
        document.getElementById('bg-part3'),
        document.getElementById('bg-part4')
    ];
  
    // Функция для перемещения фоновых изображений при прокрутке
    function moveBackgroundImages() {
        // Получаем текущее значение прокрутки по вертикали
        const scrollPosition = window.scrollY;

        // Перебираем каждый элемент фона
        bgParts.forEach((part, index) => {
            // Определяем скорость перемещения на основе индекса
            const speed = index % 2 === 0 ? 0.2 : 0.3;
            // Если индекс четный, перемещаем элемент влево
            if (index % 2 === 0) {
                part.style.left = -200 + scrollPosition * speed + 'px';
            } else {
                // Если индекс нечетный, перемещаем элемент вправо
                part.style.right = -200 + scrollPosition * speed + 'px';
            }
        });
    }
  
    // Добавляем обработчик события прокрутки, который будет вызывать функцию перемещения
    window.addEventListener('scroll', moveBackgroundImages);
  
    // Получаем все изображения в элементе с ID "top"
    const parts = document.querySelectorAll("#top img");
    // Устанавливаем скорость перемещения изображений
    const speed = 2;
    // Максимальные значения по X и Y для ограничения движения изображений
    const maxX = document.body.scrollWidth - 100;
    const maxY = document.body.scrollHeight - 100;
  
    // Создаем массив состояния для каждого изображения, инициализируя его позиции и скорости
    const state = Array.from(parts).map(part => ({
        element: part, // Элемент изображения
        x: Math.random() * maxX, // Случайная начальная позиция по X
        y: Math.random() * maxY, // Случайная начальная позиция по Y
        dx: (Math.random()) * speed, // Случайная скорость по X
        dy: (Math.random()) * speed, // Случайная скорость по Y
    }));
  
    // Функция для обновления позиций изображений
    function updatePositions() {
        // Перебираем каждое состояние изображения
        state.forEach(item => {
            // Обновляем позиции по X и Y на основе скорости
            item.x += item.dx;
            item.y += item.dy;

            // Проверяем границы по X, если за пределами, меняем направление
            if (item.x <= 0 || item.x >= maxX) {
                item.dx = -item.dx; // Инвертируем скорость по X
            }
            // Проверяем границы по Y, если за пределами, меняем направление
            if (item.y <= 0 || item.y >= maxY) {
                item.dy = -item.dy; // Инвертируем скорость по Y
            }

            // Обновляем стиль элемента, устанавливая новые координаты
            item.element.style.left = item.x + "px";
            item.element.style.top = item.y + "px";
        });
  
        // Запрашиваем следующую анимацию кадра
        requestAnimationFrame(updatePositions);
    }
  
    // Запускаем обновление позиций
    updatePositions();
});