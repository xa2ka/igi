// Геолокация
document.getElementById('get-location').addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById('location-output').textContent = `Ваше местоположение: ${latitude}, ${longitude}`;
            },
            (error) => {
                document.getElementById('location-output').textContent = `Ошибка получения геолокации: ${error.message}`;
            }
        );
    } else {
        document.getElementById('location-output').textContent = "Геолокация не поддерживается браузером.";
    }
});

// Синтез речи
document.getElementById('speak-button').addEventListener('click', () => {
    const textToSpeak = document.getElementById('speech-input').value;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ru-RU'; // Устанавливаем язык
    window.speechSynthesis.speak(utterance);
});

// Статус батареи
navigator.getBattery().then((battery) => {
    const updateBatteryStatus = () => {
        const status = `Уровень заряда: ${Math.round(battery.level * 100)}%. Зарядка: ${battery.charging ? "Да" : "Нет"}`;
        document.getElementById('battery-status').textContent = status;
    };

    updateBatteryStatus(); // Выводим начальное состояние

    // Обработчики для обновления информации о батарее
    battery.addEventListener('chargingchange', updateBatteryStatus);
    battery.addEventListener('levelchange', updateBatteryStatus);
});


document.getElementById('get-weather').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    const apiKey = 'YOUR_API_KEY'; // Замените на ваш ключ API OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Город не найден');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            document.getElementById('weather-output').textContent = `Температура в ${city}: ${temperature}°C, ${weatherDescription}.`;
        })
        .catch(error => {
            document.getElementById('weather-output').textContent = error.message;
        });
});

document.getElementById('get-profile').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Пользователь не найден');
            }
            return response.json();
        })
        .then(data => {
            const profileOutput = `
                <h2>${data.name}</h2>
                <img src="${data.avatar_url}" alt="${data.name}">
                <p>Количество репозиториев: ${data.public_repos}</p>
                <p>Биография: ${data.bio || 'Нет информации'}</p>
                <p><a href="${data.html_url}" target="_blank">Профиль на GitHub</a></p>
            `;
            document.getElementById('profile-output').innerHTML = profileOutput;
        })
        .catch(error => {
            document.getElementById('profile-output').textContent = error.message;
        });
});