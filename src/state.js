'use strict';

const _ = require('underscore');

class State {

    constructor(startState = {}) {
        const { loopIndex, userStrategy, userPoints, botStartegy, botPoints } = startState;

        this._loopIndex = loopIndex || 0;
        this._userStrategy = userStrategy || _.random(0, 2);
        this._userPoints = userPoints || 0;
        this._botStartegy = botStartegy || _.random(0, 2);;
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

    setUserStrategy(strategy) {
        this._userStrategy = parseInt(strategy);
    }

    addUserPoints(points) {
        this._userPoints += parseInt(points);
    }

    setBotStrategy(strategy) {
        this._userStrategy = parseInt(strategy);
    }

    addBotPoints(points) {
        this._userPoints += parseInt(points);
    }

}

class StateStorage {
    constructor() {
        this.states = {};
    }

    getState(id) {
        return this.states[id] || new State();
    }

    setState(id, state) {
        this[id] = new State(state);
    }
}

const stateStorage = new StateStorage();

module.exports = {
    State,
    stateStorage
};