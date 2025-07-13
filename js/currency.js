document.getElementById('fetch-rates').addEventListener('click', async () => {
  const crypto = document.getElementById('crypto').value;
  const currency = document.getElementById('currency').value;
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
  );
  const data = await response.json();
  
  const price = data[crypto][currency];
  document.getElementById('crypto-data').innerHTML = `
    <p>1 ${crypto.toUpperCase()} = ${price} ${currency.toUpperCase()}</p>
  `;
});