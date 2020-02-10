const { _ } = require('underscore');

const introTalk = 'Над столицей империи наступила ночь.. Пламя факела освещает полупустой трактирный зал.. За угловым столиком сидите вы и ваш напарник.. Вы тихо переговариваетесь между собой, стараясь не привлекать к себе лишнего внимания.. ';
const dictorTalk = 'Нам надо справедливо поделить добычу.. ';

const intro = [
  `${introTalk}${dictorTalk}`,
  `${introTalk}<speaker effect="pitch_down">${dictorTalk}`,
];

const speech = (answers) => [
  ` Возможны два варианта ответа, первый - ${answers[0].text_answer} и второй - ${answers[1].text_answer}`,
  `<speaker effect="-">Возможны два варианта ответа, первый - <speaker effect="pitch_down">${answers[0].text_answer}<speaker effect="-"> и второй - <speaker effect="pitch_down">${answers[1].text_answer}`,
];

const goodBye = (score) => [
  ` В результате обсуждения вы пришли к общему решению. И ваша добыча составила ${score} процентов`,
  `<speaker effect="-">В результате обсуждения вы пришли к общему решению. <speaker audio="alice-sounds-human-cheer-1.opus"><speaker effect="pitch_down">И ваша добыча составила ${score} процентов`,
];

const botTalk = (answer) => [
  `Ваш оппонент отвечает - ${answer.text_answer}`,
  `<speaker effect="-">Ваш оппонент отвечает - <speaker effect="hamster">${answer.text_answer}`,
];

const question = (q) => [
  ` ${q}`,
  `<[2500]><speaker effect="pitch_down">${q}`,
];

const checkAnswer = (answers, tokens) => {
  let res = null;
  console.log('tokens', tokens);
  tokens.forEach((token) => {
    if (token === '1' || token === 'один' || token === 'первый') {
      res = answers[0].strategy;
    }

    if (token === '2' || token === 'два' || token === 'второй') {
      res = answers[1].strategy;
    }
  });

  // TODO: нужно зациклить пользователя, чтобы он выбрал один из вариантов
  if (res === null) {
    return answers[_.random(0, 1)].strategy;
  }
  return res;
};

module.exports = {
  intro,
  speech,
  goodBye,
  botTalk,
  question,
  checkAnswer,
};
