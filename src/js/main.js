import "@babel/polyfill";
import { getWords, getFromStorage } from './services/main.js'
import { Game } from './controllers/main.js'

window.addEventListener('load', function () {
    init();
});

async function init() {
    const words = await getWords();
    if (typeof words.dictionary !== 'undefined') {
        let game = new Game(words.dictionary);
        const data = await getFromStorage();
        if (data) {
            game.setGame(data);
        }
        game.renderGame();
        document.querySelector('.refresh').addEventListener('click', function () {
            game.reInitGame();
        });
    }
}