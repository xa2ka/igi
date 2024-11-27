class Slider {
    // Конструктор класса Slider
    constructor(container, intervalInput, options = {}) {
        // Сохранение ссылки на контейнер и слайды
        this.container = container;
        this.slides = Array.from(container.querySelectorAll('.slide'));
        // Сохранение ссылки на элемент ввода интервала
        this.intervalInput = intervalInput;
        this.currentSlide = 0; // Индекс текущего слайда
        this.delay = options.delay || 0;

        // Установка интервала из localStorage или значения по умолчанию
        const savedInterval = localStorage.getItem('sliderInterval');
        this.interval = savedInterval ? parseInt(savedInterval, 10) : (options.auto ? 5000 : parseInt(this.intervalInput.value, 10) || 5000);
        
        this.loop = options.loop ?? true; // Зацикливание слайдов по умолчанию
        this.auto = options.auto ?? true; // Автоматическое переключение по умолчанию
        this.stopMouseHover = options.stopMouseHover ?? true; // Остановка при наведении мыши
        this.navs = options.navs ?? true; // Навигационные кнопки по умолчанию
        this.pags = options.pags ?? true; // Пагинация по умолчанию

        this.initControls(); // Инициализация элементов управления
        if (this.auto) this.startSlider(); // Запуск слайдера, если авто

        // Установка слушателя изменений для поля ввода интервала
        this.intervalInput.addEventListener('input', () => {
            clearInterval(this.slideInterval); // Остановка текущего интервала
            this.interval = parseInt(this.intervalInput.value, 10) || 5000; // Обновление значения интервала
            localStorage.setItem('sliderInterval', this.interval); // Сохранение значения в localStorage
            this.startSlider(); // Перезапуск слайдера с новым интервалом
        });
    }

    // Инициализация элементов управления (кнопки навигации и пагинации)
    initControls() {
        if (this.navs) {
            // Установка слушателей для кнопок навигации
            document.getElementById('prevSlide').addEventListener('click', () => this.prevSlide());
            document.getElementById('nextSlide').addEventListener('click', () => this.nextSlide());
        } else {
            // Скрытие кнопок навигации, если они отключены
            document.querySelectorAll('.nav-btn').forEach(btn => btn.style.display = 'none');
        }

        if (this.pags) {
            // Установка слушателей для точек пагинации
            this.paginationDots = Array.from(document.querySelectorAll('.pagination-dot'));
            this.paginationDots.forEach(dot => {
                dot.addEventListener('click', (e) => this.goToSlide(parseInt(e.target.dataset.index, 10)));
            });
        }
    }

    // Запуск слайдера
    startSlider() {
        this.showSlide(this.currentSlide); // Показ текущего слайда
        // Установка интервала переключения слайдов
        this.slideInterval = setInterval(() => this.nextSlide(), this.interval); 

        // Остановка слайдера при наведении мыши
        if (this.stopMouseHover) {
            this.container.addEventListener('mouseover', () => clearInterval(this.slideInterval));
            this.container.addEventListener('mouseout', () => this.startSlider());
        }
    }

    // Показ слайда по индексу
    showSlide(curInd) {
        // Переключение класса 'active' для отображения текущего слайда
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === curInd);
        });

        // Обновление заголовка и номера слайда
        document.getElementById('caption').textContent = this.slides[curInd].dataset.caption;
        document.getElementById('slideNumber').textContent = `${curInd + 1} / ${this.slides.length}`;
        
        // Обновление точек пагинации
        this.paginationDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === curInd);
        });
    }

    // Переключение на следующий слайд
    nextSlide() {
        // Увеличение индекса текущего слайда или возвращение к началу
        if (this.currentSlide < this.slides.length - 1) {
            this.currentSlide++;
        } else if (this.loop) {
            this.currentSlide = 0;
        } else {
            clearInterval(this.slideInterval); // Остановка, если не зацикливается
            return;
        }
        this.showSlide(this.currentSlide); // Показ нового слайда
    }

    // Переключение на предыдущий слайд
    prevSlide() {
        // Уменьшение индекса текущего слайда или переход к последнему
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else if (this.loop) {
            this.currentSlide = this.slides.length - 1;
        }
        this.showSlide(this.currentSlide); // Показ нового слайда
    }

    // Переход на указанный слайд по индексу
    goToSlide(index) {
        clearInterval(this.slideInterval); // Остановка текущего интервала
        this.currentSlide = index; // Установка нового индекса текущего слайда
        this.showSlide(this.currentSlide); // Показ нового слайда
        if (this.auto) this.startSlider(); // Перезапуск слайдера, если авто
    }
}

// Инициализация слайдера после загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.banner'); // Поиск контейнера слайдера
    const intervalInput = document.getElementById('intervalInput'); // Поиск элемента ввода интервала
    // Создание экземпляра класса Slider
    new Slider(banner, intervalInput, {
        loop: true, // Включение зацикливания
        navs: true, // Включение навигационных кнопок
        pags: true, // Включение пагинации
        auto: true, // Включение автоматического переключения
        stopMouseHover: true // Остановка при наведении мыши
    });
});