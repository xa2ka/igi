// Ждем, пока весь документ загрузится
document.addEventListener("DOMContentLoaded", function() {
  const rowsPerPage = 3; // Количество строк, отображаемых на одной странице
  let rows = Array.from(document.querySelectorAll('.employee-row')); // Получаем все строки сотрудников
  let currentPage = 1; // Текущая страница

  // Функция для отображения определенной страницы
  function showPage(page) {
      // Фильтруем строки, чтобы оставить только включенные
      const filteredRows = rows.filter(row => row.getAttribute('data-included') === 'on'); 

      // Скрываем все строки
      rows.forEach(row => row.style.display = 'none');
      
      // Отображаем строки на текущей странице
      filteredRows.forEach((row, index) => {
          const start = (page - 1) * rowsPerPage; // Начальный индекс
          const end = page * rowsPerPage; // Конечный индекс
          // Показываем строки в пределах текущей страницы
          row.style.display = (index >= start && index < end) ? '' : 'none';
      });
  }

  // Функция для обновления пагинации
  function updatePagination() {
      const paginationElement = document.getElementById('pagination'); // Получаем элемент пагинации
      paginationElement.innerHTML = ''; // Очищаем содержимое

      // Фильтруем строки для пагинации
      const filteredRows = rows.filter(row => row.getAttribute('data-included') === 'on');
      const totalPages = Math.ceil(filteredRows.length / rowsPerPage); // Общее количество страниц

      // Кнопка "Назад"
      const prevButton = document.createElement('button');
      prevButton.textContent = 'Назад';
      prevButton.disabled = currentPage === 1; // Дизаблим, если на первой странице
      prevButton.onclick = function() {
          if (currentPage > 1) {
              currentPage--; // Уменьшаем номер страницы
              showPage(currentPage); // Показываем новую страницу
              updatePagination(); // Обновляем пагинацию
          }
      };
      paginationElement.appendChild(prevButton); // Добавляем кнопку в элемент пагинации

      // Создаем кнопки для страниц
      for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.textContent = i; // Номер страницы
          pageButton.classList.toggle('active', i === currentPage); // Активный класс для текущей страницы
          pageButton.onclick = function() {
              currentPage = i; // Устанавливаем текущую страницу
              showPage(currentPage); // Показываем новую страницу
              updatePagination(); // Обновляем пагинацию
          };
          paginationElement.appendChild(pageButton); // Добавляем кнопку страницы
      }

      // Кнопка "Вперед"
      const nextButton = document.createElement('button');
      nextButton.textContent = 'Вперед';
      nextButton.disabled = currentPage === totalPages; // Дизаблим, если на последней странице
      nextButton.onclick = function() {
          if (currentPage < totalPages) {
              currentPage++; // Увеличиваем номер страницы
              showPage(currentPage); // Показываем новую страницу
              updatePagination(); // Обновляем пагинацию
          }
      };
      paginationElement.appendChild(nextButton); // Добавляем кнопку в элемент пагинации
  }

  // Функция для фильтрации строк по тексту поиска
  function filterRows(searchText) {
      rows.forEach(row => {
          let isMatch = false; // Переменная для проверки соответствия
          // Проверяем каждую ячейку в строке на соответствие тексту поиска
          row.querySelectorAll('td').forEach(cell => {
              if (cell.innerText.toLowerCase().includes(searchText.toLowerCase())) {
                  isMatch = true; // Если найдено соответствие
              }
          });

          // Устанавливаем атрибут включения в зависимости от соответствия
          row.setAttribute('data-included', isMatch ? 'on' : 'off');
      });

      currentPage = 1; // Сбрасываем страницу на 1
      showPage(currentPage); // Показываем первую страницу
      updatePagination(); // Обновляем пагинацию
  }

  // Получаем элементы для поиска
  const searchButton = document.getElementById('search-button'); // Кнопка поиска
  const searchInput = document.getElementById('search-input'); // Поле ввода для поиска
  // Добавляем обработчик событий на кнопку поиска
  searchButton.addEventListener('click', function() {
      const searchText = searchInput.value; // Получаем текст поиска
      filterRows(searchText); // Фильтруем строки по тексту
  });

  showPage(currentPage); // Показываем первую страницу
  updatePagination(); // Обновляем пагинацию

  // Получаем элементы для добавления сотрудника
  const addEmployeeBtn = document.getElementById("add-employee-btn"); // Кнопка добавления сотрудника
  const addEmployeeForm = document.getElementById("add-employee-form"); // Форма добавления сотрудника
  const employeeForm = document.getElementById("employee-form"); // Форма сотрудника
  const validationMessage = document.getElementById("validation-message"); // Элемент для сообщений об ошибках

  // Обработчик для кнопки добавления сотрудника
  addEmployeeBtn.addEventListener("click", function () {
      // Переключаем видимость формы добавления
      addEmployeeForm.style.display = addEmployeeForm.style.display === "none" ? "block" : "none";
  });

  // Функция для проверки URL
  function validateURL(url) {
      const regex = /^(http:\/\/|https:\/\/).*\.(php|html)$/; // Регулярное выражение для проверки URL
      return regex.test(url); // Возвращаем результат проверки
  }

  // Функция для проверки номера телефона
  function validatePhone(phone) {
      const regex = /^(\+375|8)\s*\(?\d{2}\)?\s*\d{3}[- ]?\d{2}[- ]?\d{2}$/; // Регулярное выражение для проверки телефона
      return regex.test(phone); // Возвращаем результат проверки
  }

  // Обработчик для отправки формы сотрудника
  employeeForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Предотвращаем обычное поведение формы

      // Получаем значения полей формы
      const fullName = document.getElementById("full-name").value;
      const jobDesc = document.getElementById("job-desc").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const url = document.getElementById("url").value;
      const photo = document.getElementById("photo").files[0]; // Получаем файл фотографии

      // Проверяем формат URL
      if (!validateURL(url)) {
          validationMessage.textContent = "Неверный формат URL."; // Сообщение об ошибке
          document.getElementById("url").style.border = "2px solid red"; // Обводим поле красной рамкой
          document.getElementById("url").style.backgroundColor = "pink"; // Меняем фон на розовый
          return; // Прерываем выполнение
      }

      // Проверяем формат номера телефона
      if (!validatePhone(phone)) {
          validationMessage.textContent = "Неверный формат номера телефона."; // Сообщение об ошибке
          document.getElementById("phone").style.border = "2px solid red"; // Обводим поле красной рамкой
          document.getElementById("phone").style.backgroundColor = "pink"; // Меняем фон на розовый
          return; // Прерываем выполнение
      }

      // Очищаем сообщения об ошибках и возвращаем стили к норме
      validationMessage.textContent = ""; 
      document.getElementById("url").style.border = "";
      document.getElementById("url").style.backgroundColor = "";
      document.getElementById("phone").style.border = "";
      document.getElementById("phone").style.backgroundColor = "";

      // Создаем новую строку для таблицы
      const newRow = document.createElement("tr");
      newRow.classList.add("employee-row"); // Добавляем класс для строки
      newRow.setAttribute("data-included", "on"); // Устанавливаем атрибут включения

      // Заполняем строку данными
      newRow.innerHTML = `
          <td><img src="${URL.createObjectURL(photo)}" alt="Photo" class="employee-img" style="width: 50px; height: 50px;"/></td>
          <td>${fullName}</td>
          <td>${jobDesc}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td>${url}</td>
          <td><input type="checkbox" name="employee_select"></td>
      `;

      // Добавляем новую строку в таблицу
      document.querySelector(".employee-table tbody").appendChild(newRow);

      // Сбрасываем форму и скрываем ее
      employeeForm.reset();
      addEmployeeForm.style.display = "none";

      // Обновляем массив строк и показываем первую страницу
      rows = Array.from(document.querySelectorAll(".employee-row")); 
      currentPage = 1;
      showPage(currentPage);
      updatePagination();
  });

  // Обработчик для кнопки премирования
  document.getElementById('premium-button').addEventListener('click', function() {

      const loader = document.querySelector('.loader'); // Получаем элемент загрузчика
      const premiumBody = document.getElementById('premium-body'); // Получаем элемент для премирования
      loader.style.display = 'block'; // Показываем загрузчик
      premiumBody.innerHTML = ''; // Очищаем содержимое

      // Получаем всех выбранных сотрудников
      const selectedEmployees = document.querySelectorAll('.employee-row input[type="checkbox"]:checked');
      const employeeNames = Array.from(selectedEmployees).map(checkbox => {
          const row = checkbox.closest('.employee-row'); // Находим родительскую строку
          const fullName = row.children[1].textContent; // Получаем имя сотрудника
          return fullName; // Возвращаем имя
      });

      // Имитация задержки перед показом результата
      setTimeout(() => {
          loader.style.display = 'none'; // Скрываем загрузчик
          if (employeeNames.length > 0) {
              // Формируем текст для успешного премирования
              const text = `Сотрудники ${employeeNames.join(', ')} были премированы за выдающиеся успехи и вклад в компанию.`;
              premiumBody.innerHTML = `<p class="premium-text">${text}</p>`; // Отображаем текст
          } else {
              // Если нет выбранных сотрудников
              premiumBody.innerHTML = '<p class="premium-text">Не выбраны сотрудники для премирования.</p>';
          }
      }, 3000); // Задержка в 3 секунды
  });
});

// Функция для сортировки таблицы
function sortTable(columnIndex) {
  const table = document.querySelector('.employee-table'); // Получаем элемент таблицы
  const rows = Array.from(table.querySelectorAll('tbody tr')); // Получаем все строки таблицы

  // Проверяем, была ли колонка отсортирована по возрастанию
  const isAscending = table.querySelectorAll('th')[columnIndex].classList.contains('ascending');

  // Удаляем классы сортировки из всех заголовков
  table.querySelectorAll('th').forEach(th => th.classList.remove('ascending', 'descending'));

  // Устанавливаем класс в зависимости от направления сортировки
  if (isAscending) {
      table.querySelectorAll('th')[columnIndex].classList.add('descending');
  } else {
      table.querySelectorAll('th')[columnIndex].classList.add('ascending');
  }

  // Сортируем строки в зависимости от содержимого ячеек
  rows.sort((rowA, rowB) => {
      const cellA = rowA.cells[columnIndex].innerText.trim();
      const cellB = rowB.cells[columnIndex].innerText.trim();

      // Определяем порядок сортировки
      if (isAscending) {
          return cellA > cellB ? -1 : 1; 
      } else {
          return cellA < cellB ? -1 : 1; 
      }
  });

  // Добавляем отсортированные строки обратно в таблицу
  rows.forEach(row => table.querySelector('tbody').appendChild(row));
}

// Функция для переключения деталей сотрудника
function toggleDetails(row) {
  var detailsDiv = document.getElementById('employee-details'); // Получаем элемент для деталей
  
  // Проверяем, открыты ли детали
  if (detailsDiv.style.display === 'block') {
      detailsDiv.style.display = 'none'; // Скрываем детали
  } else {
      var cells = row.getElementsByTagName('td'); // Получаем все ячейки строки
      
      // Получаем данные о сотруднике
      var photo = cells[0].querySelector('img').src; // Получаем URL фотографии
      var name = cells[1].innerText; // Получаем имя
      var jobDescription = cells[2].innerText; // Получаем описание работы
      var email = cells[3].innerText;  // Получаем email
      var phoneNumber = cells[4].innerText; // Получаем номер телефона
      var profileUrl = cells[5].innerText; // Получаем URL профиля

      // Заполняем элемент для деталей
      detailsDiv.innerHTML = `
          <h3>Детали сотрудника</h3>
          <p>Фото: <img src="${photo}" alt="Фото сотрудника" style="width: 100px; height: 100px;"></p>
          <p>Имя: ${name}</p>
          <p>Описание работы: ${jobDescription}</p>
          <p>Email: ${email}</p>
          <p>Номер телефона: ${phoneNumber}</p>
          <p>URL профиля: ${profileUrl}</p>
      `;

      detailsDiv.style.display = 'block'; // Показываем детали
  }
}