export class Game {
    constructor(words) {
        this.dictionary = words;
        this.words = Game.shuffle(words).splice(1,5);
        this.currentLetters = [];
        this.wordPointer = 0;
        this.maxRounds = 5;
        this.letterPointer = 0;
        this.self = this;
    }

    static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    renderGame() {
        const word = this.words[this.wordPointer];
        const lettersShuffled = Game.shuffle(word.split(''));
        this.drawButtons(lettersShuffled);
    }

    drawButtons(letters) {
        const el = document.querySelector('#letters');
        el.innerHTML = '';
        letters.forEach((letter) => {
            let node = document.createElement('BUTTON');
            node.textContent = letter;
            node.classList.add('letter', 'btn', 'btn-primary');
            node.addEventListener('click', this.selectEvent);
            el.appendChild(node);
        });
    }

    getCurrentLetter() {
        const word = this.words[this.wordPointer];
        const currentLetters = word.split('');
        return currentLetters[this.letterPointer];
    }

    static select(selected) {
        // console.log('inner: ', inner);
        const currentLetter = this.getCurrentLetter();
        console.log('selected: ', selected, 'currentLetter: ', currentLetter);
    }

    selectEvent() {
        // console.log('select', this.self);
        Game.select(this.innerText);
        // console.log(obj, this);
        // console.log(test);
        // console.log(this.innerText);
        // console.log(this.innerText, this.getCurrentLetter());
    }

    // todo; если равны то окрашивать зеленым и добавлять букву
}