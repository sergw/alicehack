const {filterAnswer} = require('../src/filter');
const initialAnswers = [{text_answer: 'a', strategy: 0},{text_answer: 'b', strategy: 1},{text_answer: 'c', strategy: 2}];
console.log(
    {strategy: 0},
    filterAnswer(0, initialAnswers)
);
console.log(
    {strategy: 1},
    filterAnswer(1, initialAnswers)
);
console.log(
    {strategy: 2},
    filterAnswer(2, initialAnswers)
);
console.log(
    {initialAnswers: null},
    filterAnswer(1, null)
);
console.log(
    {initialAnswers: 4},
    filterAnswer(1, [1,2,3,4])
);
console.log(
    {initialAnswers: 2},
    filterAnswer(1, [1,2])
);
console.log(
    {strategy: 4},
    filterAnswer(4, initialAnswers)
);
console.log(
    {strategy: null},
    filterAnswer(null, initialAnswers)
);
