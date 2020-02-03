const { _ } = require('underscore');
const { filterAnswer } = require('../src/filter');

module.exports = {
  randomAnswer(botStrategy, userStrategy, botAnswersAll) {
    // TODO: поидее бот не должен знать о стратегии пользователя, но тут можно усложнить игру
    // или заранее продумать стратегию и придерживаться ей, вместо тупого рандома
    const answers = filterAnswer(botStrategy, botAnswersAll);
    const randomNumber = _.random(0, answers.length - 1);
    return answers[randomNumber];
  },
};
