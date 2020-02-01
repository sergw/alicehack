'use strict';

const _ = require('underscore');
const assert = require('assert');

class State {

    constructor(startState = {}) {
        const { loopIndex, userStrategy, userPoints, botStartegy, botPoints } = startState;

        this._loopIndex = loopIndex || 0;
        this._userStrategy = userStrategy || _.random(0, 2);
        this._userPoints = userPoints || 0;
        this._botStartegy = botStartegy || _.random(0, 2);
        this._botPoints = botPoints || 0;
    }

    getloopIndex() {
        return this._loopIndex;
    }

    getUserInfo() {
        return {
            strategy: this._userStrategy,
            points: this._userPoints
        }
    }

    getBotInfo() {
        return {
            strategy: this._botStartegy,
            points: this._botPoints
        }
    }

    loopNext() {
        this._loopIndex++;
        return this._loopIndex;
    }

    gameOver(loopsLength) {
        return loopsLength - 1 >= this._loopIndex;
    }

    setUserStrategy(strategy) {
        this._userStrategy = parseInt(strategy);
    }

    addUserPoints(points) {
        this._userPoints += parseInt(points);
    }

    setBotStrategy(strategy) {
        this._botStartegy = parseInt(strategy);
    }

    addBotPoints(points) {
        this._botPoints += parseInt(points);
    }

    //TODO: убрать из стейта
    calcUserScore() {
        const sum = this._botPoints + this._userPoints;
        return parseInt( this._userPoints / sum * 100 )
    }
}

class StateStorage {
    constructor() {
        this.states = {};
    }

    getState(userId) {
        return this.states[userId].state;
    }

    checkSession(userId, sessionId) {
        if (!this.states[userId]) {
            return false;
        }
        return this.states[userId].sessionId === sessionId;
    }

    setState(userId, sessionId, state) {
        this.states[userId] = {
            sessionId,
            state: new State(state)
        }
    }
}

const stateStorage = new StateStorage();

module.exports = {
    State,
    stateStorage
};
