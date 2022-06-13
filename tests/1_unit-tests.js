const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();


suite('Unit Tests', () => {

  suite('Translate text to British English', () => {
    const sourceLocale = 'american';

    test('Translate Mangoes are my favorite fruit.', (done) => {
      const text = 'Mangoes are my favorite fruit.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Mangoes are my favourite fruit.');

      done();
    });

    test('Translate I ate yogurt for breakfast.', (done) => {
      const text = 'I ate yogurt for breakfast.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'I ate yoghurt for breakfast.');

      done();
    });

    test(`Translate We had a party at my friend's condo.`, (done) => {
      const text = 'We had a party at my friend\'s condo';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'We had a party at my friend\'s flat');

      done();
    });

    test('Translate Can you toss this in the trashcan for me?', (done) => {
      const text = 'Can you toss this in the trashcan for me?';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Can you toss this in the bin for me?');

      done();
    });

    test('Translate The parking lot was full.', (done) => {
      const text = 'The parking lot was full.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'The car park was full.');

      done();
    });

    test('Translate Like a high tech Rube Goldberg machine.', (done) => {
      const text = 'Like a high tech Rube Goldberg machine.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Like a high tech Heath Robinson device.');

      done();
    });

    test('Translate To play hooky means to skip class or work.', (done) => {
      const text = 'To play hooky means to skip class or work.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'To bunk off means to skip class or work.');

      done();
    });

    test('Translate No Mr. Bond, I expect you to die.', (done) => {
      const text = 'No Mr. Bond, I expect you to die.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'No Mr Bond, I expect you to die.');

      done();
    });

    test('Translate Dr. Grosh will see you now.', (done) => {
      const text = 'Dr. Grosh will see you now.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Dr Grosh will see you now.');

      done();
    });

    test('Translate Lunch is at 12:15 today.', (done) => {
      const text = 'Lunch is at 12:15 today.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Lunch is at 12.15 today.');

      done();
    });
  });

  suite('Translate text to American English', () => {
    const sourceLocale = 'british';

    test('Translate We watched the footie match for a while.', (done) => {
      const text = 'We watched the footie match for a while.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'We watched the soccer match for a while.');

      done();
    });

    test('Translate Paracetamol takes up to an hour to work.', (done) => {
      const text = 'Paracetamol takes up to an hour to work.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Tylenol takes up to an hour to work.');

      done();
    });

    test('Translate First, caramelise the onions.', (done) => {
      const text = 'First, caramelise the onions.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'First, caramelize the onions.');

      done();
    });

    test('Translate I spent the bank holiday at the funfair.', (done) => {
      const text = 'I spent the bank holiday at the funfair.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'I spent the public holiday at the carnival.');

      done();
    });

    test('Translate I had a bicky then went to the chippy.', (done) => {
      const text = 'I had a bicky then went to the chippy.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'I had a cookie then went to the fish-and-chip shop.');

      done();
    });

    test(`Translate I've just got bits and bobs in my bum bag.`, (done) => {
      const text = '';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, '');

      done();
    });

    test('Translate The car boot sale at Boxted Airfield was called off.', (done) => {
      const text = 'The car boot sale at Boxted Airfield was called off.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'The swap meet at Boxted Airfield was called off.');

      done();
    });

    test('Translate Have you met Mrs Kalyani?', (done) => {
      const text = 'Have you met Mrs Kalyani?';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Have you met Mrs. Kalyani?');

      done();
    });

    test(`Translate Prof Joyner of King's College, London.`, (done) => {
      const text = `Prof Joyner of King's College, London.`;
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, `Prof. Joyner of King's College, London.`);

      done();
    });

    test('Translate Tea time is usually around 4 or 4.30.', (done) => {
      const text = 'Tea time is usually around 4 or 4.30.';
      const result = translator.translate(text, sourceLocale);
      assert.equal(result, 'Tea time is usually around 4 or 4:30.');

      done();
    });
  });

  suite('Highlight translation', () => {

    test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
      const text = 'Mangoes are my favorite fruit.';
      const translation = translator.translate(text, 'american');
      const result = translator.highlightTranslations(text, translation, 'american');
      assert.equal(result, 'Mangoes are my <span class="highlight">favourite</span> fruit.');

      done();
    });

    test('Highlight translation in I ate yogurt for breakfast.', (done) => {
      const text = 'I ate yogurt for breakfast.';
      const translation = translator.translate(text, 'american');
      const result = translator.highlightTranslations(text, translation, 'american');
      assert.equal(result, 'I ate <span class="highlight">yoghurt</span> for breakfast.');

      done();
    });

    test('Highlight translation in We watched the footie match for a while.', (done) => {
      const text = 'We watched the footie match for a while.';
      const translation = translator.translate(text, 'british');
      const result = translator.highlightTranslations(text, translation, 'british');
      assert.equal(result, 'We watched the <span class="highlight">soccer</span> match for a while.');

      done();
    });

    test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
      const text = 'Paracetamol takes up to an hour to work.';
      const translation = translator.translate(text, 'british');
      const result = translator.highlightTranslations(text, translation, 'british');
      assert.equal(result, '<span class="highlight">Tylenol</span> takes up to an hour to work.');

      done();
    });

  });

});
