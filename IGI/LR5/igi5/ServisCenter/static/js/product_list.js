// Ждем, пока весь документ будет загружен
document.addEventListener("DOMContentLoaded", function () {
    // Получаем все карточки продуктов
    const cards = document.querySelectorAll('.product-card-wrapper');

    // Проходим по каждой карточке
    cards.forEach(cardWrapper => {
        // Находим элемент карточки внутри обертки
        const card = cardWrapper.querySelector('.product-card');

        // Добавляем слушатель события 'mousemove' на обертку карточки
        cardWrapper.addEventListener('mousemove', (event) => {
            // Получаем размеры и положение обертки карточки
            const rect = cardWrapper.getBoundingClientRect();
            const [width, height] = [rect.width, rect.height];
            const middleX = width / 2; // Находим середину по X
            const middleY = height / 2; // Находим середину по Y

            // Вычисляем смещение по X и Y на основе положения курсора
            const offsetX = ((event.offsetX - middleX) / middleX) * 20;  
            const offsetY = ((event.offsetY - middleY) / middleY) * 20;

            // Вычисляем положение фона карточки
            const posX = 50 + ((event.offsetX - middleX) / middleX) * 15;
            const posY = 50 - ((event.offsetY - middleY) / middleY) * 15;

            // Применяем трансформацию к карточке для эффекта 3D
            card.style.transform = `rotateY(${offsetX}deg) rotateX(${offsetY}deg)`;
            // Устанавливаем положение фона карточки
            card.style.backgroundPosition = `${posX}% ${posY}%`;
        });

        // Добавляем слушатель события 'mouseleave' на обертку карточки
        cardWrapper.addEventListener('mouseleave', () => {
            // Сбрасываем трансформацию карточки при выходе курсора
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            // Сбрасываем положение фона карточки
            card.style.backgroundPosition = '50% 50%';
        });
    });

    // Устанавливаем количество элементов на странице
    const itemsPerPage = 3; 
    // Получаем все карточки продуктов
    const products = document.querySelectorAll(".product-card-wrapper");
    // Получаем контейнер для пагинации
    const paginationContainer = document.querySelector(".pagination-container");
    let currentPage = 1; // Инициализируем текущую страницу
    // Вычисляем общее количество страниц
    const totalPages = Math.ceil(products.length / itemsPerPage);

    // Функция для отображения элементов на текущей странице
    function displayItems(page) {
        products.forEach((product, index) => {
            product.style.display = "none"; // Скрываем все карточки
            const start = (page - 1) * itemsPerPage; // Начальный индекс для текущей страницы
            const end = start + itemsPerPage; // Конечный индекс для текущей страницы
            // Отображаем карточки в пределах текущей страницы
            if (index >= start && index < end) {
                product.style.display = "block"; // Показываем карточку
            }
        });
    }

    // Функция для настройки пагинации
    function setupPagination() {
        paginationContainer.innerHTML = ""; // Очищаем контейнер пагинации
        // Создаем кнопки для каждой страницы
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button"); // Создаем кнопку
            button.textContent = i; // Устанавливаем текст кнопки
            button.classList.add("pagination-button"); // Добавляем класс для кнопки
            if (i === currentPage) button.classList.add("active"); // Выделяем текущую страницу
            // Добавляем обработчик события для кнопки
            button.addEventListener("click", () => {
                currentPage = i; // Устанавливаем текущую страницу
                displayItems(currentPage); // Обновляем отображение карточек
                document.querySelector(".pagination-button.active").classList.remove("active"); // Убираем выделение с предыдущей кнопки
                button.classList.add("active"); // Выделяем текущую кнопку
            });
            paginationContainer.appendChild(button); // Добавляем кнопку в контейнер
        }
    }

    displayItems(currentPage); // Отображаем карточки для первой страницы
    setupPagination(); // Настраиваем пагинацию
});