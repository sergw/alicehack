const { State } = require('../src/state');
const _ = require('underscore');
const assert = require('assert');

console.log('State consutructor without initial state argument');
assert.equal(new State().getUserInfo().points, 0);
assert.equal(new State().getBotInfo().points, 0);
assert.equal(new State().getloopIndex(), 0);

console.log('State consutructor with initial state argument');
const initialState = {
    loopIndex: 1,
    userStrategy: 2,
    userPoints: 3,
    botStartegy: 4,
    botPoints: 5
}
assert.deepEqual(
    new State(initialState).getUserInfo(),
    {
        points: 3,
        strategy: 2
    }
);
assert.deepEqual(
    new State(initialState).getBotInfo(),
    {
        points: 5,
        strategy: 4
    }
);
assert.equal(new State(initialState).getloopIndex(), 1);

console.log('State loopNext');
assert.equal(new State().loopNext(), 1);
assert.equal(new State(initialState).loopNext(), 2);