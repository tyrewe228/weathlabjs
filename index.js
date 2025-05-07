const fs = require('fs').promises;
const readline = require('readline-sync');

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

async function main() {
    try {
        const config = await loadConfig('config.json');
        const city = readline.question('Enter city name: ');
        const data = await getDataFromApi(config.api_key, city);
        
        console.log(`Погода в ${data.name}:`);
        console.log(`Температура: ${data.main.temp}°C`);
        console.log(`Опис: ${data.weather[0].description}`);
        console.log(`Вологість: ${data.main.humidity}%`);
        
        await fs.writeFile('output.json', JSON.stringify(data, null, 2));
        console.log('Дані збережено у output.json');
        
    } catch (error) {
        console.error('Помилка виконання:', error.message);
    }
}

main();