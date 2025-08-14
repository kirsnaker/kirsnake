document.getElementById('generate').addEventListener('click', () => {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const resultElement = document.getElementById('result');
    
    if (min >= max) {
        alert('Минимум должен быть меньше максимума!');
        return;
    }
    
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    resultElement.textContent = `Результат: ${randomNum}`;
});