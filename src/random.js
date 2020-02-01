const { filterAnswer } = require('../src/filter');
const { _ } = require('underscore');

module.exports = {
    randomAnswer: function(ai_strategy, player_strategy, ai_answers) {
        let answers = filterAnswer(ai_strategy, ai_answers);
        let randomNumber = _.random(0, answers.length - 1);
        return answers[randomNumber];
    }
}
