document.getElementById('fetch-rates').addEventListener('click', async () => {
    const crypto = document.getElementById('crypto').value;
    const currency = document.getElementById('currency').value;
    const cryptoDataElement = document.getElementById('crypto-data');
    
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
        );
        const data = await response.json();
        
        if (data[crypto]) {
            const price = data[crypto][currency];
            cryptoDataElement.innerHTML = `
                <p>1 ${crypto.toUpperCase()} = ${price} ${currency.toUpperCase()}</p>
            `;
        } else {
            cryptoDataElement.innerHTML = '<p>Данные не найдены</p>';
        }
    } catch (error) {
        cryptoDataElement.innerHTML = '<p>Ошибка загрузки данных</p>';
    }
});