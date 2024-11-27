class CountdownTimer {
    // Конструктор класса CountdownTimer, принимает длительность и ID элемента
    constructor(duration, elementId) {
        this.duration = duration; // Длительность отсчета в миллисекундах
        this.element = document.getElementById(elementId); // Ссылка на элемент по ID
        this.startTime = this.getOrSetStartTime(); // Получение или установка времени начала
        this.updateCountdown(); // Инициализация отображения отсчета
        this.startInterval(); // Запуск интервала обновления
    }

    // Получение или установка времени начала в local storage
    getOrSetStartTime() {
        let storedTime = localStorage.getItem('startTime'); // Получение сохраненного времени
        if (!storedTime) {
            storedTime = Date.now(); // Установка текущего времени, если нет сохраненного
            localStorage.setItem('startTime', storedTime); // Сохранение времени начала
        }
        return parseInt(storedTime, 10); // Возвращение времени начала в миллисекундах
    }

    // Обновление отображения обратного отсчета
    updateCountdown() {
        const now = Date.now(); // Получение текущего времени
        const elapsedTime = now - this.startTime; // Вычисление прошедшего времени
        const timeRemaining = this.duration - elapsedTime; // Вычисление оставшегося времени

        // Проверка, истекло ли время
        if (timeRemaining <= 0) {
            this.element.textContent = "Время истекло!"; // Сообщение об истечении времени
            this.clearCountdown(); // Очистка отсчета
            return;
        }

        // Вычисление часов, минут и секунд
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60)); // Полные часы
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)); // Полные минуты
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000); // Остаток секунд

        // Обновление текста элемента с оставшимся временем
        this.element.textContent = `Обратный отсчёт: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Запуск интервала обновления отсчета каждую секунду
    startInterval() {
        this.intervalId = setInterval(() => this.updateCountdown(), 1000); // Обновление каждую секунду
    }

    // Очистка отсчета и удаление времени начала из local storage
    clearCountdown() {
        clearInterval(this.intervalId); // Остановка интервала
        localStorage.removeItem('startTime'); // Удаление времени начала из local storage
    }
}

// Слушатель события загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    const countdownDuration = 60 * 60 * 1000; // Установка длительности отсчета в 1 час
    new CountdownTimer(countdownDuration, 'countdown'); // Создание экземпляра CountdownTimer
});