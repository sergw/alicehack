const { json } = require('micro');
const { State, stateStorage } = require('./src/state');
const { winLose } = require('./src/winLose');
const { randomAnswer } = require('.src/randomAnswer');

module.exports = async (req, res) => {
  const { request, session, version } = await json(req);
  const db = require('./src/db');
  const userId = session.user_id;
  const sessionId = session.session_id;
  const isStart = stateStorage.checkSession(userId, sessionId);

  const currentState = isStart ? new State() : stateStorage.getState(userId);

  const currentLoop = currentState.getloopIndex();

  let resText = '';
  let resTts = '';
  if (currentLoop > 0) {
    const botInfo = currentState.getBotInfo();
    const userInfo = currentState.getUserInfo();
    const botAnswers = db.getBotAnswers(currentLoop);
    const botAnswer = randomAnswer(botInfo.strategy, botAnswers);

    resText += botAnswer;
    resTts += `<speaker effect="pitch_down">${botAnswer}</speaker>`;

    const points = winLose(userInfo.strategy, botAnswer.strategy);
    currentState.addUserPoints(points[0]);
    currentState.addBotPoints(points[1]);
    currentState.setBotStrategy(botAnswer.strategy);
    currentState.loopNext();
  } else {
    resText = 'Над столицей империи наступила ночь. Пламя факела освещает полупустой трактирный зал. За угловым столиком силите вы и ваш напарник. Вы тихо переговариваетесь между собой, стараясь не привлекать к себе лишнего внимания. Как нам справедливо поделить добычу? ';
    resTts = 'Над столицей империи наступила ночь. Пламя факела освещает полупустой трактирный зал. За угловым столиком силите вы и ваш напарник. Вы тихо переговариваетесь между собой, стараясь не привлекать к себе лишнего внимания. <speaker effect="pitch_down">Как нам справедливо поделить добычу?</speaker>';
    const question = db.getQuestion(currentLoop);
    resText += question;
    resTts += `<speaker effect="pitch_down">${question}</speaker>`;
  }

  res.end(JSON.stringify({
    version,
    session,
    response: { text: resText, tts: resTts, end_session: false }
  }));
};
