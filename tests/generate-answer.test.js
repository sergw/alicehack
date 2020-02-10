const { generateAnswer } = require('../src/generate-answer');
const initialAnswers = [{strategy: 0},{strategy: 1}];
console.log('generateAnswer with "imitator" strategy');
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('imitator', null, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: false },
    generateAnswer('imitator', 1, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: false },
    generateAnswer('imitator', 0, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('imitator', 0, 1, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('imitator', 1, 1, initialAnswers)
);

console.log('generateAnswer with "naive" strategy');
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('naive', null, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('naive', 1, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('naive', 0, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('naive', 0, 1, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('naive', 1, 1, initialAnswers)
);

console.log('generateAnswer with "cheater" strategy');
console.log(
    { answer: { strategy: 0 }, changeType: false },
    generateAnswer('cheater', null, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: false },
    generateAnswer('cheater', 1, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: false },
    generateAnswer('cheater', 0, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: false },
    generateAnswer('cheater', 0, 1, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: false },
    generateAnswer('cheater', 1, 1, initialAnswers)
);

console.log('generateAnswer with "vindictive" strategy');
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('vindictive', null, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: 'cheater' },
    generateAnswer('vindictive', 1, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 0 }, changeType: 'cheater' },
    generateAnswer('vindictive', 0, 0, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('vindictive', 0, 1, initialAnswers)
);
console.log(
    { answer: { strategy: 1 }, changeType: false },
    generateAnswer('vindictive', 1, 1, initialAnswers)
);
