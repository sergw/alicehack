const { json } = require('micro');
module.exports = async (req, res) => {
  const { request, session, version } = await json(req);
  let resText = request.original_utterance || 'Над столицей империи наступила ночь. Пламя факела освещает полупустой трактирный зал. За угловым столиком сидят четверо. Они тихо переговариваются между собой, стараясь не привлекать к себе лишнего внимания.';
  console.log('tokens', request.nlu);
  if (request.nlu && request.nlu.tokens && ( request.nlu.tokens.indexOf('помощь') >= 0 || ( request.nlu.tokens.indexOf('умеешь') >= 0 && request.nlu.tokens.indexOf('что') >= 0 ))) {
    resText = 'Я мастер игры в подземелья и драконы. Давайте продолжим игру.';
  }
  res.end(JSON.stringify({
    version,
    session,
    response: { text: resText, end_session: false }
  }));
};
