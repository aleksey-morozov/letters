import { saveToStorage } from '../services/main';

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
    }

    setGame({ words, wordPointer, letterPointer, errors,  stats}) {
        this.words = words;
        this.wordPointer = wordPointer;
        this.letterPointer = letterPointer;
        this.errors = errors;
        this.stats = stats;
    }

    renderGame() {
        this.drawRoundNumber();
        document.querySelector('#total_questions').innerHTML = this.maxWords + 1;
        this.displayStatsLine(false).displayLetters();
        const word = this.words[this.wordPointer];
        const lettersShuffled = Game.shuffle(word.split(''));
        this.drawButtons(lettersShuffled);
        return this;
    }

    reInitGame() {
        this.stats = [];
        this.wordPointer = 0;
        this.drawRoundNumber().initWords().renderGame().saveToStorage();
        return this;
    }

    nextWord() {
        this.wordPointer++;
        this.letterPointer = 0;
        this.successLetters = [];
        this.errors = 0;
        this.drawAnswer();
        if (this.wordPointer > this.maxWords) {
            this.stopTimer().drawStats();
        } else {
            this.saveToStorage();
            this.drawRoundNumber().renderGame().startTimer();
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

    getCurrentLetters() {
        return this.getCurrentWord().split('');
    }

    drawButtons(letters) {
        const selectedLetters = [];
        if (this.letterPointer > 0) {
            const curLetters = this.getCurrentLetters();
            for (let key in curLetters) {
                if (this.letterPointer > key) {
                    selectedLetters.push(curLetters[key]);
                    this.successLetters.push(curLetters[key]);
                }
            }

            if (this.successLetters.length > 0) {
                this.drawAnswer();
            }
        }

        const el = document.querySelector('#letters');
        el.innerHTML = '';
        for (let key in letters) {
            const letter = letters[key];
            let node = document.createElement('BUTTON');
            node.textContent = letter;
            let btnClass = 'btn-primary';
            const index = selectedLetters.indexOf(letter);
            if (index > -1) {
                btnClass = 'btn-success';
                selectedLetters.splice(index, 1);
            }
            node.classList.add(`letter-${key}`, 'btn', btnClass);
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
        this.togglePrimaryClass(el, false).toggleDangerClass(el);
        setTimeout(() => {
            this.toggleDangerClass(el, false).togglePrimaryClass(el);
        }, 400);
    }

    selectSuccess(key) {
        const el = document.querySelector(`.letter-${key}`);
        this.togglePrimaryClass(el, false).toggleSuccessClass(el);
    }

    selectEvent(key) {
        const el = document.querySelector(`.letter-${key}`);
        const letter = el.textContent.trim();
        const currentLetter = this.getCurrentLetter();
        if (currentLetter !== letter) {
            this.selectError(key);
            this.errors++;
            this.saveToStorage();
        } else if (!el.classList.contains('btn-success')) {
            this.successLetters.push(letter);
            this.drawAnswer();
            this.selectSuccess(key);
            this.letterPointer++;
            if (!this.getCurrentLetter()) {
                this.stopTimer().nextWord();
            } else {
                this.saveToStorage();
            }
        }
    }

    saveToStorage() {
        const data = {
            words: this.words,
            wordPointer: this.wordPointer,
            letterPointer: this.letterPointer,
            errors: this.errors,
            stats: this.stats,
        };

        saveToStorage(data);
    }

    displayStatsLine(show= true) {
        let display = 'block';
        if (!show) {
            display = 'none';
        }
        document.querySelector('.stats').style.display = display;
        return this;
    }

    displayLetters(show = true) {
        let display = 'block';
        if (!show) {
            display = 'none';
        }
        document.querySelector('#letters').style.display = display;
        return this;
    }

    drawStats() {
        this.displayLetters(false).displayStatsLine();
        let fullTime = 0;
        let errors = 0;
        this.stats.forEach((item) => {
            fullTime += ~~item.fullTime;
            errors += item.errors;
        });
        const template = `Количество ошибок: ${errors} Секунд: ${fullTime}`;
        const el = document.querySelector('.stats .stats-info');
        el.innerHTML = template;
    }

    togglePrimaryClass(el, add = true) {
        if (add) {
            el.classList.add('btn-primary');
        } else {
            el.classList.remove('btn-primary');
        }
        return this;
    }

    toggleDangerClass(el, add = true) {
        if (add) {
            el.classList.add('btn-danger');
        } else {
            el.classList.remove('btn-danger');
        }
        return this;
    }

    toggleSuccessClass(el, add = true) {
        if (add) {
            el.classList.add('btn-success');
        } else {
            el.classList.false('btn-success');
        }
        return this;
    }

    drawRoundNumber() {
        document.querySelector('#current_question').innerHTML = this.wordPointer + 1;
        return this;
    }
}