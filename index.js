const { json } = require('micro');
const { stateStorage } = require('./src/state');
const winLose = require('./src/winLose');
const { randomAnswer } = require('./src/random');
const { filterAnswer } = require('./src/filter');
const {
  intro,
  speech,
  goodBye,
  botTalk,
  question,
  checkAnswer,
} = require('./src/speech');
const db = require('./src/db');

module.exports = async (req, res) => {
  const loopCount = db.getLoopCount();

  const { request, session, version } = await json(req);
  const userId = session.user_id;
  const sessionId = session.session_id;
  const hasSession = stateStorage.checkSession(userId, sessionId);

  // TODO: если сессия другая нужно спросить может пользователь хочет продолжить
  if (!hasSession) {
    stateStorage.setState(userId, sessionId, {});
  }

  const currentState = stateStorage.getState(userId);
  const currentLoop = currentState.getloopIndex();

  // Переменные для формирования ответа
  let text = '';
  let tts = '';
  let end_session = false; // eslint-disable-line camelcase

  if (hasSession) {
    // Проверяем, что ответил пользователь
    const userInfo = currentState.getUserInfo();
    const userAnswersAll = db.getUserAnswers(currentLoop);
    const userAnswers = filterAnswer(userInfo.strategy, userAnswersAll);
    const userStrategy = checkAnswer(userAnswers, request.nlu.tokens);
    currentState.setUserStrategy(userStrategy);

    // Сообщаем решение бота
    const botInfo = currentState.getBotInfo();
    const botAnswersAll = db.getBotAnswers(currentLoop);
    const botAnswer = randomAnswer(botInfo.strategy, userStrategy, botAnswersAll);
    currentState.setBotStrategy(botAnswer.strategy);
    [text, tts] = botTalk(botAnswer);

    // Подсчитываем очки в результате выбранных решений очки
    const points = winLose(userStrategy, botAnswer.strategy);
    currentState.addUserPoints(points[0]);
    currentState.addBotPoints(points[1]);
    console.log(userStrategy, botAnswer.strategy, points);

    // Переходим на следующий уровень истории
    const nextLoop = currentState.loopNext();

    if (nextLoop >= loopCount) {
      // История закончилась контента нет, нужно заканчивать игру
      const [goodByeText, goodByeTts] = goodBye(currentState.calcUserScore());
      text += goodByeText;
      tts += goodByeTts;
      end_session = true; // eslint-disable-line camelcase
    } else {
      // Продолжаем историю
      const [questionText, questionTts] = question(db.getQuestion(nextLoop));
      text += questionText;
      tts += questionTts;
      // Сообщаем пользователю варианты которые он может выбрать
      const [userAnswerText, userAnswerTts] = speech(
        filterAnswer(userStrategy, db.getUserAnswers(nextLoop)),
      );
      text += userAnswerText;
      tts += userAnswerTts;
    }
  } else {
    [text, tts] = intro;

    const [questionText, questionTts] = question(db.getQuestion(currentLoop));
    text += questionText;
    tts += questionTts;

    const userAnswersAll = db.getUserAnswers(currentLoop);
    const userInfo = currentState.getUserInfo();
    const userAnswers = filterAnswer(userInfo.strategy, userAnswersAll);
    const [userAnswerText, userAnswerTts] = speech(userAnswers);
    text += userAnswerText;
    tts += userAnswerTts;
  }

  res.end(JSON.stringify({
    version,
    session,
    response: { text, tts, end_session },
  }));
};
