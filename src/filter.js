const { _ } = require('underscore');

module.exports = {
    filterAnswer: function(strategy, answers) {
        if (!answers || answers.length < 3 || answers.length > 3) {
            return [];
        }
        if (strategy === 0) {
            return _.reject(answers, (a) => a.strategy === 2);
        } else if (strategy === 1) {
            return _.reject(answers, (a) => a.strategy === 1);
        } else if (strategy === 2) {
            return _.reject(answers, (a) => a.strategy === 0);
        } else {
            return [];
        }
    }
}
