/* Задание 3.
Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
В input можно ввести любое число. При клике на кнопку происходит следующее:
- Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
- Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.

Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.*/

const input = document.getElementById("input");
const button = document.getElementById("button");
const imagesDiv = document.getElementById("images");
const errorDiv = document.getElementById("error");

button.addEventListener("click", () => {
  const number = Number(input.value);
  if (number < 1 || number > 10) {
    errorDiv.textContent = "Число вне диапазона от 1 до 10";
    imagesDiv.innerHTML = "";
    return;
  }
  errorDiv.innerHTML = "";
  const url = `https://picsum.photos/v2/list?limit=${number}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.addEventListener("load", () => {
    const response = JSON.parse(xhr.responseText);
    imagesDiv.innerHTML = response.map(item => `<img src="${item.download_url}">`).join("");
  });
  xhr.send();
});