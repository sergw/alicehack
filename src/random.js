const { _ } = require('underscore');

module.exports = {
  randomAnswer(botStrategy, userStrategy, botAnswers) {
    // TODO: поидее бот не должен знать о стратегии пользователя, но тут можно усложнить игру
    // или заранее продумать стратегию и придерживаться ей, вместо тупого рандома
    const randomNumber = _.random(0, botAnswers.length - 1);
    return botAnswers[randomNumber];
  },
};
