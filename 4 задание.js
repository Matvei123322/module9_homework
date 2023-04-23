/* Задание 4. 
Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. 
В input можно ввести любое число.
При клике на кнопку происходит следующее:
Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.*/

const widthInput = document.querySelector('#widthInput');
const heightInput = document.querySelector('#heightInput');
const submitBtn = document.querySelector('#submitBtn');
const result = document.querySelector('#result');

submitBtn.addEventListener('click', () => {
  const widthValue = parseInt(widthInput.value);
  const heightValue = parseInt(heightInput.value);

  if (isNaN(widthValue) || isNaN(heightValue) ||
      widthValue < 100 || widthValue > 300 ||
      heightValue < 100 || heightValue > 300) {
    result.textContent = 'Одно из чисел вне диапазона от 100 до 300';
    return;
  }

  fetch(`https://picsum.photos/${widthValue}/${heightValue}`)
    .then(response => {
      const img = document.createElement('img');
      img.src = response.url;
      result.innerHTML = '';
      result.appendChild(img);
    })
    .catch(error => {
      console.error('Ошибка загрузки картинки', error);
      result.textContent = 'Ошибка загрузки картинки';
    });
});