'use strict';

export default class Level {
  constructor(level){
    this.level = level;
  }

  get() {
    return this.level;
  }

  next() {
    if (this.level >= 10) return;
    this.level++;
  }
}