const data = require('./db/firstRoom.json');

const getQuestion = (loopId) => {
    if (loopId > getLoopCount() - 1) {
        return [];
    }

    return data.loops[loopId].loop_question;
};

const getUserAnswers = (loopId) => {
    if (loopId > getLoopCount() - 1) {
        return [];
    }

    return data.loops[loopId].user_answers;
};

const getBotAnswers = (loopId) => {
    if (loopId > getLoopCount() - 1) {
        return [];
    }

    return data.loops[loopId].bot_answers;
};

const getLoopCount = () => data.loops.length;

module.exports = {
    getQuestion,
    getUserAnswers,
    getBotAnswers,
    getLoopCount
}
