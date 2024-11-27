// Ждем, пока весь документ будет загружен
document.addEventListener("DOMContentLoaded", function() {
    // Объявляем глобальную функцию checkAge
    window.checkAge = function() {
        // Получаем значение поля ввода даты рождения
        const dobInput = document.getElementById('dob').value;
        // Получаем элемент для отображения результата
        const resultDiv = document.getElementById('confirmation-result');

        // Проверяем, заполнено ли поле ввода
        if (!dobInput) {
            // Если поле пустое, выводим сообщение об ошибке
            resultDiv.innerHTML = "<div class='alert'>Пожалуйста, введите дату рождения.</div>";
            return; // Завершаем выполнение функции
        }

        // Преобразуем введенную дату в объект Date
        const dob = new Date(dobInput);
        // Получаем текущую дату
        const today = new Date();
        // Вычисляем возраст на основе разницы между годами
        let age = today.getFullYear() - dob.getFullYear();
        // Определяем разницу в месяцах
        const m = today.getMonth() - dob.getMonth();
        // Если день рождения еще не наступил в этом году, уменьшаем возраст на 1
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        // Массив с названиями дней недели
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        // Получаем день недели для даты рождения
        const dayOfWeek = daysOfWeek[dob.getDay()];

        // Формируем сообщение в зависимости от возраста
        const ageMessage = age >= 18 
            ? `<div class='success'>Вам ${age} лет. День вашего рождения — ${dayOfWeek}.</div>` // Если 18 и больше
            : `<div class='alert'>Вам ${age} лет. Вы несовершеннолетний. Для использования сайта вам необходимо разрешение родителей.</div>`; // Если меньше 18

        // Отображаем сформированное сообщение в элементе resultDiv
        resultDiv.innerHTML = ageMessage;
    }
});