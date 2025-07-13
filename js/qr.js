document.getElementById('qr-generate').addEventListener('click', async () => {
    const input = document.getElementById('qr-input').value.trim();
    const qrImage = document.getElementById('qr-image');
    const qrError = document.getElementById('qr-error');
    const loading = document.querySelector('.loading');
    const downloadBtn = document.getElementById('download-btn');
    
    // Сбрасываем состояние
    qrImage.style.display = 'none';
    qrError.style.display = 'none';
    loading.style.display = 'none';
    downloadBtn.style.display = 'none';
    
    if (!input) {
        showError('Введите текст или ссылку!');
        return;
    }
    
    loading.style.display = 'block';
    qrError.style.display = 'none';

    try {
        // Пробуем 3 разных API последовательно
        const apiUrls = [
            `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(input)}&color=2e7d32&format=png`,
            `https://quickchart.io/qr?text=${encodeURIComponent(input)}&size=200&dark=2e7d32`,
            `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(input)}&chco=2e7d32`
        ];

        let success = false;
        
        for (const apiUrl of apiUrls) {
            try {
                await loadImage(qrImage, apiUrl);
                success = true;
                break;
            } catch (e) {
                console.log(`API ${apiUrl.split('/')[2]} не сработал, пробуем следующий...`);
            }
        }

        if (!success) throw new Error('Все API недоступны');

        qrImage.style.display = 'block';
        downloadBtn.style.display = 'block';
    } catch (error) {
        console.error('Ошибка:', error);
        showError('Ошибка: проверьте интернет и попробуйте снова');
    } finally {
        loading.style.display = 'none';
    }
});

// Улучшенная функция загрузки изображения
function loadImage(imgElement, url) {
    return new Promise((resolve, reject) => {
        const tester = new Image();
        tester.onload = () => {
            imgElement.src = url;
            resolve();
        };
        tester.onerror = () => reject(new Error(`Не удалось загрузить изображение с ${url.split('/')[2]}`));
        tester.src = url;
    });
}

// Скачивание QR-кода
document.getElementById('download-btn').addEventListener('click', () => {
    const filename = `qr-${Math.random().toString(36).substring(2, 9)}.png`;
    const link = document.createElement('a');
    link.href = document.getElementById('qr-image').src;
    link.download = filename;
    link.click();
});

function showError(message) {
    const qrError = document.getElementById('qr-error');
    qrError.innerHTML = `<span>🛑 ${message}</span>`;
    qrError.style.display = 'block';
}