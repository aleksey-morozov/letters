import axios from "axios/index";

export async function getWords() {
    try {
        let response = await axios.get('./data.json');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получения словаря!');
    }
}

export async function saveToStorage(data) {
    localStorage.setItem('gameData', JSON.stringify(data));
}

export async function getFromStorage() {
    return JSON.parse(localStorage.getItem('gameData'));
}