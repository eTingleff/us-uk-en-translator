const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

function getReversedDictionary(dictionary) {
  const dict = {
    ...new Object(dictionary),
  };

  return Object.fromEntries(
    Object.entries(dict).map(([k, v]) => [v, k])
  );
}

class Translator {

  getTranslation(locale, text) {
    if (!locale || !locale.trim() || text === null || text === undefined) {

      return {
        error: 'Required field(s) missing',
      };
    }

    if (typeof text === 'string' && !text.trim()) {

      return {
        error: 'No text to translate',
      };
    }

    const loc = locale.trim().toLowerCase();

    if (loc !== 'american-to-british' && loc !== 'british-to-american') {

      return {
        error: 'Invalid value for locale field',
      };
    }

    const sourceText = text.trim();
    const locales = loc.split('-to-');
    const sourceLocale = locales[0];
    const targetLocale = locales[1];

    let translation = this.translate(sourceText, sourceLocale);

    if (translation === sourceText) {
      translation = 'Everything looks good to me!';
    } else {
      translation = this.highlightTranslations(
        sourceText,
        this.translate(sourceText, sourceLocale),
        sourceLocale,
      )
    }

    return {
      text: sourceText,
      translation,
    };
  }

  translate(sourceText, sourceLocale) {
    const dictionary = this.getDictionary(sourceLocale);
    let subDict;

    const replacer = (match) => subDict[match.toLowerCase()];

    subDict = dictionary.sourceOnly;
    let matchString = Object.keys(subDict).join('\\b|');
    let regex = new RegExp(matchString, 'ig');
    let translatedText = sourceText.replace(regex, replacer);

    subDict = dictionary.sourceToTargetSpelling;
    matchString = Object.keys(subDict).join('\\b|');
    regex = new RegExp(matchString, 'ig');
    translatedText = translatedText.replace(regex, replacer);

    subDict = dictionary.sourceToTargetTitles;
    matchString = Object.keys(subDict)
      .sort((a, b) => b.length - a.length)
      .map((title) => title.replace('.', '\\.'))
      .join('|');

    const titleReplacer = (match) => {
      let val = subDict[match.toLowerCase()];

      return val.charAt(0).toUpperCase() + val.slice(1);
    }

    regex = new RegExp(matchString, 'ig');
    translatedText = translatedText.replace(regex, titleReplacer);

    const timeRegex = sourceLocale === 'american'
      ? /([0-9]?[0-9]):([0-9][0-9])/g
      : /([0-9]?[0-9])\.([0-9][0-9])/g;

    translatedText = translatedText.replace(timeRegex, (m, hours, minutes) => {
      const separator = sourceLocale === 'american' ? '.' : ':';

      return `${hours}${separator}${minutes}`;
    });

    return translatedText;
  }

  getDictionary(sourceLocale) {
    if (sourceLocale === 'american') {

      return {
        sourceOnly: americanOnly,
        sourceToTargetSpelling: americanToBritishSpelling,
        sourceToTargetTitles: americanToBritishTitles,
      };
    } else if (sourceLocale === 'british') {
      const britishToAmericanSpelling = getReversedDictionary(americanToBritishSpelling);
      const britishToAmericanTitles = getReversedDictionary(americanToBritishTitles);

      return {
        sourceOnly: britishOnly,
        sourceToTargetSpelling: britishToAmericanSpelling,
        sourceToTargetTitles: britishToAmericanTitles,
      };
    }
  }

  highlightTranslations(sourceText, translatedText, sourceLocale,) {
    const sourceTextArray = sourceText.split(' ');
    const translatedTextArray = translatedText.split(' ');

    const timeRegex = sourceLocale === 'american'
      ? /([0-9]?[0-9])\.([0-9][0-9])/g
      : /([0-9]?[0-9]):([0-9][0-9])/g;

    let highlightedTranslations = translatedTextArray.map((word, index) => {

      return word !== sourceTextArray[index] && !timeRegex.test(word)
        ? `<span class="highlight">${word}</span>`
        : word;
    });

    return highlightedTranslations.join(' ')
      .replace(timeRegex, (match) => {

        return `<span class="highlight">${match}</span>`;
      });
  }
}

module.exports = Translator;