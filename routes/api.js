'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {
        locale,
        text,
      } = req.body;
      const response = translator.getTranslation(locale, text);

      return res.json(response);
    });
};
