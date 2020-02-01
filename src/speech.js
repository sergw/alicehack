const { getUserAnswers } = require('./db');
const { _ } = require('underscore');
const speech = (answers) => `Возможны два варианта ответа, первый - ${answers[0].text_answer} и второй - ${answers[1].text_answer}`;

const checkAnswer = (answers, tokens) => {
    let res = null
    tokens.forEach(token => {
        if (token === '1' || token === "один" || token === "первый") {
            res = answers[0].strategy
        }

        if (token === '2' || token === "два" || token === "второй") {
            res = answers[1].strategy
        }
    });
    if (res === null) {
        return answers[_.random(0, 1)].strategy;
    }
    return res;
};

module.exports = {
    speech,
    checkAnswer
}