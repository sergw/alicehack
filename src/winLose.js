const winLose = (a, b) => {
    if (a === 0 && b === 0) {
        return [-1, -1];
    }

    if (a === 1 && b === 1) {
        return [1, 1];
    }

    if (a === 2 && b === 2) {
        return [3, 3];
    }

    if (a === 0 && b === 2) {
        return [3, -1];
    }

    if (a === 2 && b === 0) {
        return [-1, 3];
    }

    if (a === 0 && b === 1) {
        return [1, 0];
    }

    if (a === 1 && b === 0) {
        return [0, 1];
    }

    if (a === 2 && b === 1) {
        return [1, 0];
    }
    if (a === 1 && b === 2) {
        return [0, 1];
    }


    return false;
}

module.exports = winLose
