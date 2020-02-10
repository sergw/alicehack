const { _ } = require('underscore');
const BOT_TYPES = [
    // доверие, потом повторяет предыдущий ход оппонента
    'imitator',
    // всегда доверяет
    'naive',
    // всегда жульничает
    'cheater',
    // доверие до первого обмана, потом всегда обман
    'vindictive',
    // доверие, обман, доверие, доверие, потом играет как обманщик до первого обмана - дальше как иммитатор
    // 'detective',
    // доверие, обман если обмануть 2 раза
    // 'mimic',
    // доверие, потом повтор хода при доверии и ход наоборот при обмане
    // 'simpleton',
    // всегда случайный ответ
    'random'
];

module.exports = {
    BOT_TYPES,
    generateAnswer(botType, botStrategy, prevUserStrategy, botAnswers) {
        return answerStrategies[botType](botStrategy, prevUserStrategy, botAnswers);
    },
};

const answerStrategies = {
    random: function(botStrategy, prevUserStrategy, botAnswers) {
        const randomNumber = _.random(0, botAnswers.length - 1);
        return {
            botAnswer: botAnswers[randomNumber],
            changeType: false
        };
    },
    imitator: function(botStrategy, prevUserStrategy, botAnswers) {
        const answerIdx = botStrategy === null ? 1 : prevUserStrategy;
        return {
            botAnswer: botAnswers[answerIdx],
            changeType: false
        };
    },
    naive: function(botStrategy, prevUserStrategy, botAnswers) {
        return {
            botAnswer: botAnswers[1],
            changeType: false
        };
    },
    cheater: function(botStrategy, prevUserStrategy, botAnswers) {
        return {
            botAnswer: botAnswers[0],
            changeType: false
        };
    },
    vindictive: function(botStrategy, prevUserStrategy, botAnswers) {
        if (prevUserStrategy === 0 && botStrategy !== null) {
            return {
                botAnswer: botAnswers[0],
                changeType: 'cheater'
            };
        } else {
            return {
                botAnswer: botAnswers[1],
                changeType: false
            };
        }
    },
}
