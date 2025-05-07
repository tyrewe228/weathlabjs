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