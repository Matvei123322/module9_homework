/* Задание 1.
Вам дана заготовка и результат, который вы должны получить. 
Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.*/

const parser = new DOMParser();

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentNodes = listNode.querySelectorAll("student");

const students = Array.from(studentNodes).map((studentNode) => {
  const nameNode = studentNode.querySelector("name");
  const langAttr = nameNode.getAttribute('lang');
  const firstNameNode = nameNode.querySelector("first");
  const secondNameNode = nameNode.querySelector("second");
  const age = studentNode.querySelector("age");
  const prof = studentNode.querySelector("prof");
  
  return {
  name: `${firstNameNode.textContent} ${secondNameNode.textContent}`,
  lang: langAttr,
  age: age.textContent,
  prof: prof.textContent,
  };
});

const result = { list: students };
console.log(result);