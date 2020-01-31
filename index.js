const { json } = require('micro');
module.exports = async (req, res) => {
  const { request, session, version } = await json(req);
  res.end(JSON.stringify({
    version,
    session,
    response: { text: request.original_utterance || 'Над столицей империи наступила ночь. Пламя факела освещает полупустой трактирный зал. За угловым столиком сидят четверо. Они тихо переговариваются между собой, стараясь не привлекать к себе лишнего внимания.', end_session: false }
  }));
};
