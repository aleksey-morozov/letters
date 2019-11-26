import "@babel/polyfill";
import { getWords } from './services/main.js'
import { Game } from './controllers/main.js'

window.addEventListener('load', function () {
    init();
});

async function init() {
    const words = await getWords();
    if (typeof words.dictionary !== 'undefined') {
        console.log('yes words: ', words.dictionary);
        let game = new Game(words.dictionary);
        // todo; здесь получать из локал сторейджа, если он пуст, то рендерить
        game.renderGame();
    }
}

/*
* Сервисный слой:
1. Получение данных с сервера
2. Advanced: Запись данных в локал стор
3. Advanced: Получение данных из локал стора

Слой логики:
1. Определение результата: правильно нажатая клавиша / ошибочно

Слой фронта:
1. Отрисовка интерфейса
2. Определение нажатой клавиши
3. Получение
* */