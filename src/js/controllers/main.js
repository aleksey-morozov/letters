export class Game {
    constructor(words) {
        this.dictionary = words;
        this.initWords();
        this.wordPointer = 0;
        this.maxWords = 4;
        this.letterPointer = 0;
        this.successLetters = [];
        this.stats = [];
        this.errors = 0;
        this.startTime = new Date();
        this.drawCurrentRound();
        document.querySelector('#total_questions').innerHTML = this.maxWords + 1;
    }

    renderGame() {
        const word = this.words[this.wordPointer];
        const lettersShuffled = Game.shuffle(word.split(''));
        this.drawButtons(lettersShuffled);
        return this;
    }

    reInitGame() {
        this.stats = [];
        this.wordPointer = 0;
        this.drawCurrentRound().initWords().renderGame();
        // todo; показывать таблицу результатов
        return this;
    }

    nextWord() {
        this.wordPointer++;
        this.letterPointer = 0;
        this.successLetters = [];
        this.drawAnswer();
        if (this.wordPointer > this.maxWords) {
            this.stopTimer().reInitGame().startTimer();
        } else {
            this.drawCurrentRound().renderGame().startTimer();
        }
    }

    initWords() {
        this.words = Game.shuffle(this.dictionary).splice(1,5);
        return this;
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

    drawButtons(letters) {
        const el = document.querySelector('#letters');
        el.innerHTML = '';
        for (let key in letters) {
            const letter = letters[key];
            let node = document.createElement('BUTTON');
            node.textContent = letter;
            node.classList.add(`letter-${key}`, 'btn', 'btn-primary');
            node.addEventListener('click', this.selectEvent.bind(this, key));
            el.appendChild(node);
        }

        return this;
    }

    drawAnswer() {
        const el = document.querySelector('#answer');
        el.innerHTML = '';
        this.successLetters.forEach((letter) => {
            let node = document.createElement('BUTTON');
            node.textContent = letter;
            node.classList.add('btn', 'btn-success');
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

    startTimer() {
        this.startTime = new Date();
    }

    stopTimer() {
        const endDate = new Date();
        this.stats.push({
            errors: this.errors,
            start: this.startTime.toLocaleTimeString(),
            end: endDate.toLocaleTimeString(),
            fullTime: (endDate.getTime() - this.startTime.getTime()) / 1000,
        });

        return this;
    }

    selectError(key) {
        const el = document.querySelector(`.letter-${key}`);
        this.togglePrimary(el, false).toggleDanger(el);
        setTimeout(() => {
            this.toggleDanger(el, false).togglePrimary(el);
        }, 400);
    }

    selectSuccess(key) {
        const el = document.querySelector(`.letter-${key}`);
        this.togglePrimary(el, false).toggleSuccess(el);
    }

    selectEvent(key) {
        const letter = document.querySelector(`.letter-${key}`).textContent;
        const currentLetter = this.getCurrentLetter();
        if (currentLetter !== letter) {
            this.selectError(key);
            this.errors++;
        } else {
            this.successLetters.push(letter);
            this.drawAnswer();
            this.selectSuccess(key);
            this.letterPointer++;
            if (!this.getCurrentLetter()) {
                this.stopTimer().nextWord();
            }
        }
    }

    togglePrimary(el, add = true) {
        if (add) {
            el.classList.add('btn-primary');
        } else {
            el.classList.remove('btn-primary');
        }
        return this;
    }

    toggleDanger(el, add = true) {
        if (add) {
            el.classList.add('btn-danger');
        } else {
            el.classList.remove('btn-danger');
        }
        return this;
    }

    toggleSuccess(el, add = true) {
        if (add) {
            el.classList.add('btn-success');
        } else {
            el.classList.false('btn-success');
        }
        return this;
    }

    drawCurrentRound() {
        document.querySelector('#current_question').innerHTML = this.wordPointer + 1;
        return this;
    }
}