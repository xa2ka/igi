// Ожидаем загрузки содержимого документа
document.addEventListener('DOMContentLoaded', () => {
    // Функция для вычисления косинуса с использованием разложения в ряд Тейлора
    function solveCos(x, eps) {
        let C = 1; // Начальное значение косинуса (косинус 0)
        let i = 1; // Счетчик итераций
        let q = 1; // Текущий член ряда
        let prevC = 0; // Предыдущее значение косинуса
        let iterations = 0; // Счетчик итераций

        // Цикл продолжается, пока разница между текущим и предыдущим значением больше eps и не превышено 500 итераций
        while (Math.abs(C - prevC) > eps && iterations <= 500) {
            prevC = C; // Сохраняем текущее значение
            // Вычисляем следующий член ряда
            q = q * (-1) * (x * x) / ((2 * i - 1) * (2 * i)); 
            C += q; // Добавляем член к сумме
            i += 1; // Увеличиваем счетчик итераций
            iterations += 1; // Увеличиваем счетчик итераций
        }

        return C; // Возвращаем вычисленное значение косинуса
    }

    // Функция для генерации данных косинуса
    function generateCosData(eps) {
        const labels = []; // Массив для меток (значений x)
        const dataCos = []; // Массив для значений косинуса
      
        let q = 0.05; // Шаг изменения x
        // Генерируем данные от -2π до 2π
        for (let x = -2 * Math.PI; x <= 2 * Math.PI; x += q) {
            labels.push(x.toFixed(2)); // Добавляем значение x в массив меток
            dataCos.push(solveCos(x, eps)); // Вычисляем косинус и добавляем в массив значений
        }
    
        return { labels, dataCos }; // Возвращаем метки и данные косинуса
    }

    // Функция для обновления графика
    function updateChart() {
        // Получаем значение погрешности (ε) из поля ввода
        const eps = parseFloat(document.getElementById('epsilon').value); 
        // Проверка на корректность введенного значения
        if (isNaN(eps) || eps <= 0) {
            alert('Введите корректное значение для погрешности (ε).'); // Сообщение об ошибке
            return;
        }
        
        // Генерируем данные косинуса
        const { labels, dataCos } = generateCosData(eps);

        // Вычисляем значения косинуса с использованием Math.cos
        const dataMathCos = labels.map(label => Math.cos(parseFloat(label)));

        // Получаем контекст для рисования графика
        const plot = document.getElementById("myChart").getContext("2d");

        // Если график уже существует, уничтожаем его перед созданием нового
        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }

        // Создаем новый график с использованием Chart.js
        window.myChart = new Chart(plot, {
            type: "line", // Тип графика - линейный
            data: {
                labels: labels, // Метки по оси X
                datasets: [
                    {
                        label: "Разложение cos(x) в ряд", // Название первого набора данных
                        data: dataCos, // Данные косинуса, рассчитанные вручную
                        borderColor: "rgba(255, 165, 0, 0.5)", // Цвет линии
                        backgroundColor: "rgba(255, 165, 0, 0.2)", // Цвет фона
                        fill: false, // Не заполнять под графиком
                        tension: 0.1, // Скругление линии
                        pointRadius: 0, // Убрать точки на графике
                    },
                    {
                        label: "Math.cos", // Название второго набора данных
                        data: dataMathCos, // Данные косинуса, полученные с помощью Math.cos
                        borderColor: "rgba(0, 128, 0, 0.5)", // Цвет линии
                        backgroundColor: "rgba(0, 128, 0, 0.2)", // Цвет фона
                        fill: false, // Не заполнять под графиком
                        tension: 0.1, // Скругление линии
                        pointRadius: 0, // Убрать точки на графике
                    },
                ],
            },
            options: {
                responsive: true, // График будет адаптироваться к размеру окна
                animation: {
                    delay: (context) => {
                        // Задержка анимации для создания эффекта плавного появления
                        delay = context.dataIndex * 80 + context.datasetIndex * 100;
                        return delay;
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "значение х", // Заголовок оси X
                        },
                        ticks: {
                            stepSize: Math.PI / 2, // Шаг по оси X
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "y", // Заголовок оси Y
                        },
                    },
                },
            },
        });
    }

    // Первоначальное обновление графика при загрузке страницы
    updateChart();

    // Обработчик события отправки формы
    document.getElementById("inputForm").addEventListener("submit", (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы
        updateChart(); // Обновляем график с новыми данными
    });
});