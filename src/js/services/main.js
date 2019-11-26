import axios from "axios/index";

export async function getWords() {
    try {
        let response = await axios.get('./data.json');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получения словаря!');
    }
}