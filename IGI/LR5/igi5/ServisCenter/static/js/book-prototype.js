// Конструктор для создания объектов произведений
function WorkPrototype(name, author, year, style) {
  this.name = name;      // Название произведения
  this.author = author;  // Автор произведения
  this.year = year;      // Год создания произведения
  this.style = style;    // Стиль произведения
}

// Метод для получения названия произведения
WorkPrototype.prototype.getName = function() {
  return this.name;
};

// Метод для установки названия произведения
WorkPrototype.prototype.setName = function(name) {
  this.name = name; // Исправлено: должно быть this.name вместо this.author
};

// Метод для получения автора произведения
WorkPrototype.prototype.getAuthor = function() {
  return this.author;
};

// Метод для установки автора произведения
WorkPrototype.prototype.setAuthor = function(author) {
  this.author = author;
};

// Метод для получения года создания произведения
WorkPrototype.prototype.getYear = function() {
  return this.year;
};

// Метод для установки года создания произведения
WorkPrototype.prototype.setYear = function(year) {
  this.year = year;
};

// Метод для получения стиля произведения
WorkPrototype.prototype.getStyle = function() {
  return this.style;
};

// Метод для установки стиля произведения
WorkPrototype.prototype.setStyle = function(style) {
  this.style = style;
};

// Конструктор для создания объектов книг, наследующий от WorkPrototype
function BookPrototype(author, year, style, pages, publisher, language) {
  WorkPrototype.call(this, author, year, style); // Вызываем конструктор родителя
  this.pages = pages;           // Число страниц в книге
  this.publisher = publisher;   // Издательство книги
  this.language = language;     // Язык книги
}

// Настраиваем наследование от WorkPrototype
BookPrototype.prototype = Object.create(WorkPrototype.prototype);
BookPrototype.prototype.constructor = BookPrototype; // Устанавливаем правильный конструктор

// Метод для получения количества страниц в книге
BookPrototype.prototype.getPages = function() {
  return this.pages;
};

// Метод для установки количества страниц в книге
BookPrototype.prototype.setPages = function(pages) {
  this.pages = pages;
};

// Метод для получения издательства книги
BookPrototype.prototype.getPublisher = function() {
  return this.publisher;
};

// Метод для установки издательства книги
BookPrototype.prototype.setPublisher = function(publisher) {
  this.publisher = publisher;
};

// Метод для получения языка книги
BookPrototype.prototype.getLanguage = function() {
  return this.language;
};

// Метод для установки языка книги
BookPrototype.prototype.setLanguage = function(language) {
  this.language = language;
};

// Массив для хранения книг
let books = [];

// Массив для хранения авторов
let authors = [];

// Функция для добавления книги на основе данных из формы
function addBookFromForm() {
// Получаем значения из полей ввода формы
const name = document.getElementById('name').value;
const author = document.getElementById('author').value;
const year = document.getElementById('year').value;
const style = document.getElementById('style').value;
const pages = document.getElementById('pages').value;
const publisher = document.getElementById('publisher').value;
const language = document.getElementById('language').value;

// Создаем новый объект книги
const newBook = new BookPrototype(name, author, year, style, pages, publisher, language);
// Добавляем книгу в массив
books.push(newBook);

// Проверяем, есть ли автор в списке, если нет, добавляем его
if (!authors.includes(author)) {
  authors.push(author);
  updateAuthorSelect(); // Обновляем выпадающий список авторов
}

displayBooks(); // Отображаем все книги
filterBooksByAuthor(); // Применяем фильтрацию книг по автору
}

// Функция для обновления выпадающего списка авторов
function updateAuthorSelect() {
const authorSelect = document.getElementById('author-select'); // Получаем элемент выпадающего списка
authorSelect.innerHTML = ''; // Очищаем текущие опции

// Создаем опцию "Все авторы"
const allOption = document.createElement('option');
allOption.value = '';
allOption.textContent = 'Все авторы';
authorSelect.appendChild(allOption); // Добавляем опцию в список

// Добавляем каждого автора в выпадающий список
authors.forEach(author => {
  const option = document.createElement('option'); // Создаем новую опцию
  option.value = author; // Устанавливаем значение
  option.textContent = author; // Устанавливаем текст
  authorSelect.appendChild(option); // Добавляем опцию в список
});
}

// Функция для фильтрации книг по автору
function filterBooksByAuthor() {
  const selectedAuthor = document.getElementById('author-select').value; // Получаем выбранного автора

  // Фильтруем книги по автору и году
  const filteredBooks = books.filter(book => {
    const isAuthorMatch = selectedAuthor ? book.getAuthor() === selectedAuthor : true; // Проверка соответствия автора
    const isYearValid = book.getYear() >= 1980; // Проверка, что год >= 1980
    return isAuthorMatch && isYearValid; // Возвращаем книги, соответствующие критериям
  });

  const outputDiv = document.getElementById('filter-output'); // Получаем элемент для вывода отфильтрованных книг
  outputDiv.innerHTML = ''; // Очищаем содержимое
  // Отображаем отфильтрованные книги
  filteredBooks.forEach(book => {
    outputDiv.innerHTML += `
      <p>${book.getName()} - ${book.getAuthor()} - ${book.getYear()}</p>
    `;
  });
}

// Функция для отображения всех книг
function displayBooks() {
const outputDiv = document.getElementById('books-output'); // Получаем элемент для вывода книг
outputDiv.innerHTML = ''; // Очищаем содержимое
// Отображаем каждую книгу
books.forEach(book => {
  outputDiv.innerHTML += `
    <p>Название: ${book.getName()} - Автор: ${book.getAuthor()} - Год: ${book.getYear()} - Стиль: ${book.getStyle()} - Страницы: ${book.getPages()} pages - Издательство: ${book.getPublisher()} - Язык: ${book.getLanguage()}</p>
  `;
});
}







// Базовый класс для произведений
class Work {
  constructor(name, author, year, style) {
      this.name = name;       // Название произведения
      this.author = author;   // Автор произведения
      this.year = year;       // Год создания произведения
      this.style = style;     // Стиль произведения
  }

  getName() {
      return this.name;
  }

  setName(name) {
      this.name = name;
  }

  info() {
      return `${this.name} by ${this.author}, ${this.year}, ${this.style}`;
  }

  addToDOM(containerId) {
      const container = document.getElementById(containerId);
      const div = document.createElement('div');
      div.textContent = this.info();
      container.appendChild(div);
  }
}

// Класс-наследник для книг
class Book extends Work {
  constructor(name, author, year, style, pages, publisher, language) {
      super(name, author, year, style); // Вызываем конструктор родителя
      this.pages = pages;         // Число страниц
      this.publisher = publisher; // Издательство
      this.language = language;   // Язык книги
  }

  getPages() {
      return this.pages;
  }

  setPages(pages) {
      this.pages = pages;
  }

  addToDOM(containerId) {
      const container = document.getElementById(containerId);
      const div = document.createElement('div');
      div.textContent = `${this.getName()} by ${this.author}, ${this.year}, ${this.style}, ${this.pages} pages, published by ${this.publisher}`;
      container.appendChild(div);
  }
}

// Массив для хранения книг
let books2 = [];

// Функция для добавления книги на основе данных из формы
function addBookFromFormClass() {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const style = document.getElementById('style').value;
  const pages = document.getElementById('pages').value;
  const publisher = document.getElementById('publisher').value;
  const language = document.getElementById('language').value;

  const newBook = new Book(name, author, year, style, pages, publisher, language); // Создаем новый объект книги
  books2.push(newBook); // Добавляем книгу в массив
  newBook.addToDOM('books-output'); // Добавляем книгу на страницу
}

// Функция для отображения всех книг
function displayBooksClass() {
  const outputDiv = document.getElementById('books-output'); // Получаем элемент для вывода
  outputDiv.innerHTML = ''; // Очищаем содержимое

  books2.forEach(book => {
      book.addToDOM('books-output'); // Добавляем каждую книгу на страницу
  });
}

// Вызов функции для добавления книги
addBookFromFormClass();