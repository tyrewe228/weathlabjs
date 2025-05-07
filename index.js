const fs = require('fs').promises;

async function loadConfig(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Помилка завантаження конфігурації:', error.message);
        throw error;
    }
}

async function getDataFromApi(apiKey, city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;
    try {
        const response = await fetch(url);
        if (response.status === 200) {
            return await response.json();
        } else {
            throw new Error(`Помилка API: ${response.status}`);
        }
    } catch (error) {
        console.error('Помилка запиту до API:', error.message);
        throw error;
    }
}