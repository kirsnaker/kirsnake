document.getElementById('calculate').addEventListener('click', () => {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  const operator = document.getElementById('operator').value;
  const resultElement = document.getElementById('result');
  
  let result;
  switch (operator) {
    case '+': result = num1 + num2; break;
    case '-': result = num1 - num2; break;
    case '*': result = num1 * num2; break;
    case '/': result = num1 / num2; break;
    default: result = 'Ошибка';
  }
  
  resultElement.textContent = `Результат: ${result}`;
});