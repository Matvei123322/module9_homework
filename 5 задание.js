/* Задание 5.
Написать код приложения, интерфейс которого состоит из двух input и кнопки. 
В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.*/

const pageInput = document.getElementById('page');
const limitInput = document.getElementById('limit');
const submitButton = document.getElementById('submit');
const errorDiv = document.getElementById('error');
const imagesDiv = document.getElementById('images');

let lastPage = localStorage.getItem('page') || 1;
let lastLimit = localStorage.getItem('limit') || 10;

pageInput.value = lastPage;
limitInput.value = lastLimit;

function showError(message) {
  errorDiv.textContent = message;
  imagesDiv.innerHTML = '';
}

function clearError() {
  errorDiv.textContent = '';
}

function showImages(images) {
  errorDiv.textContent = '';
  imagesDiv.innerHTML = images
  .map(image => `<img src="${image.download_url}" alt="${image.author}">`)
  .join('');
}

function makeRequest() {
  const page = parseInt(pageInput.value);
  const limit = parseInt(limitInput.value);

  if (isNaN(page) || page < 1 || page > 10) {
    showError('Номер страницы вне диапазона от 1 до 10');
    return;
  }

  if (isNaN(limit) || limit < 1 || limit > 10) {
    showError('Лимит вне диапазона от 1 до 10');
    return;
  }

  if (isNaN(limit) || limit < 1 || limit > 10 || isNaN(page) || page < 1 || page > 10) {
    showError('Номер страницы и лимит вне диапазона от 1 до 10');
    return;
  }

  clearError();

  fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка получения данных');
    }
    return response.json();
  })
  .then(images => {
    showImages(images);
    localStorage.setItem('page', page);
    localStorage.setItem('limit', limit);
  })
  .catch(error => {
    showError(error.message);
  });
}