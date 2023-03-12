'use strict';
import { Field, ItemType } from './field.js';
import Level from './level.js';
import * as sound from './sound.js';

export class gameBulider {
  withLevel(level) {
    this.level = level;
    return this;
  }

  build() {
    return new Game(this.level);
  }
}

export const Reason = Object.freeze({
  win: 'win',
  lose: 'lose',
  cancel: 'cancel',
});

const setLevel = [
  { duration: 100, carrot: 10, bug: 10 },
  { duration: 90, carrot: 15, bug: 15 },
  { duration: 80, carrot: 20, bug: 20 },
  { duration: 70, carrot: 25, bug: 25 },
  { duration: 60, carrot: 30, bug: 30 },
  { duration: 50, carrot: 35, bug: 35 },
  { duration: 40, carrot: 40, bug: 40 },
  { duration: 30, carrot: 45, bug: 45 },
  { duration: 20, carrot: 50, bug: 50 },
  { duration: 10, carrot: 55, bug: 55 }
];

class Game {
  constructor(level) {
    this.duration = setLevel[level-1]['duration'];
    this.carrotCount = setLevel[level-1]['carrot'];
    this.bugCount = setLevel[level-1]['bug'];

    this.level = level;
    this.field = new Field(this.carrotCount, this.bugCount);
    this.field.setClickListener(this.onItemClick);

    this.gameLevel = document.querySelector('.game__level');
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');
    this.gameBtn.addEventListener('click', () => {
      if(this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });
    
    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.win = false;
  }

  setStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.score = 0;
    this.gameScore.textContent = this.carrotCount;
    this.gameLevel.textContent = `Lv. ${this.level}`;
    this.showLevel();
    this.showButton();
    this.showTimerAndScore();
    this.startTimer();
    this.field.init();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopTimer();
    this.hideButton();
    sound.stopBackground();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick = event => {
    if(!this.started) {
      return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
      target.remove();
      this.score++;
      this.updateScoreBoard();
      sound.playCarrot();
      if (this.score === this.carrotCount) {
        this.stop(Reason.win);
        this.nextLevel();
      }
    } else if (target.matches('.bug')) {
      this.stop(Reason.lose);
    }
  };

  startTimer() {
    let remainingTimeSec = this.duration;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if(remainingTimeSec <= 0) {
        this.stop(Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.textContent = `${minutes}:${seconds}`;
  }

  updateScoreBoard() {
    this.gameScore.textContent = this.carrotCount - this.score;
  }

  showLevel() {
    this.gameLevel.classList.add('show-level');
  }

  showTimerAndScore() {
    this.gameTimer.classList.add('show-timer-score');
    this.gameScore.classList.add('show-timer-score'); 
  }

  showButton() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    if(this.started) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-stop');
    }
    this.gameBtn.classList.remove('game__button--hide');  
  }

  hideButton() {
    this.gameBtn.classList.add('game__button--hide');
  }

  nextLevel() {
    this.level++;

    this.duration = setLevel[this.level-1]['duration'];
    this.carrotCount = setLevel[this.level-1]['carrot'];
    this.bugCount = setLevel[this.level-1]['bug'];
    this.field.setCarrotCount(this.carrotCount);
    this.field.setBugCount(this.bugCount);
  }
}