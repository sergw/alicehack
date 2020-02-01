const {randomAnswer} = require('../src/random');
const initialAnswers = [{text_answer: 'a', strategy: 0},{text_answer: 'b', strategy: 1},{text_answer: 'c', strategy: 2}];
console.log(
    {strategy: 0},
    randomAnswer(0, 0, initialAnswers)
);
console.log(
    {strategy: 1},
    randomAnswer(1, 1, initialAnswers)
);
console.log(
    {strategy: 2},
    randomAnswer(2, 2, initialAnswers)
);
console.log(
    {strategy: null},
    randomAnswer(null, null, initialAnswers)
);
