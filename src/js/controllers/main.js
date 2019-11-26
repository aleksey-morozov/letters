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
            node.classList.add(`letter-${letter}`, 'btn', 'btn-primary');
            node.addEventListener('click', this.selectEvent.bind(this, letter));
            el.appendChild(node);
        });
    }

    getCurrentLetter() {
        const word = this.getCurrentWord();
        const currentLetters = word.split('');
        return currentLetters[this.letterPointer];
    }

    getCurrentWord() {
        return this.words[this.wordPointer];
    }

    select() {
        const currentLetter = this.getCurrentLetter();
        const el = document.getElementsByClassName(`letter-${currentLetter}`);
        document.querySelector('letter-h');
    }

    removePrimary(letter) {
        const el = document.querySelector(`letter-${letter}`);
        el.classList.remove('btn-primary');
        return el;
    }

    selectError(letter) {
        this.removePrimary(letter).classList.add('btn-danger');
    }

    selectSuccess(letter) {
        this.removePrimary(letter).classList.add('btn-success');
    }

    nextWord() {
        this.wordPointer++;
        this.letterPointer = 0;
        this.reInit();
    }

    reInit() {
        this.renderGame();
    }

    selectEvent(letter) {
        console.log(this.getCurrentWord());
        const currentLetter = this.getCurrentLetter();
        console.log(currentLetter, letter);
        if (currentLetter !== letter) {
            this.selectError(letter);
            console.log('Error!');
        } else {
            this.selectSuccess(letter);
            this.letterPointer++;
            if (!this.getCurrentLetter()) {
                this.nextWord();
            }
        }
    }
}