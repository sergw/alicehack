const winLose = (a, b) => {
  // оба обманывают
  if (a === 0 && b === 0) {
    return [0, 0];
  }

  // оба доверяют
  if (a === 1 && b === 1) {
    return [2, 2];
  }

  // первый обманул, второй доверился
  if (a === 0 && b === 1) {
    return [3, -1];
  }

  // первый доверился, второй обманул
  if (a === 1 && b === 0) {
    return [-1, 3];
  }

  return false;
};

module.exports = winLose;
