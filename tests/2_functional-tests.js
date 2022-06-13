const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {

  suite('POST request to /api/translate', () => {
    const endpoint = '/api/translate';

    test('Translation with text and locale fields', (done) => {
      chai.request(server)
        .post(endpoint)
        .send({
          locale: 'american-to-british',
          text: 'Mr. F. likes to play soccer at 10:30AM on Fridays.',
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            text: 'Mr. F. likes to play soccer at 10:30AM on Fridays.',
            translation: '<span class="highlight">Mr</span> F. likes to play <span class="highlight">football</span> at <span class="highlight">10.30</span>AM on Fridays.',
          });

          done();
        });
    });

    test('Translation with text and invalid locale field', (done) => {
      chai.request(server)
        .post(endpoint)
        .send({
          locale: 'british-to-invalid',
          text: 'Tea time is usually around 4 or 4.30.',
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: 'Invalid value for locale field',
          });

          done();
        });
    });

    test('Translation with missing text field', (done) => {
      chai.request(server)
        .post(endpoint)
        .send({
          locale: 'american-to-british',
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: 'Required field(s) missing',
          });

          done();
        });
    });

    test('Translation with missing locale field', (done) => {
      chai.request(server)
        .post(endpoint)
        .send({
          text: 'Tea time is usually around 4 or 4.30.',
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: 'Required field(s) missing',
          });

          done();
        });
    });

    test('Translation with empty text', (done) => {
      chai.request(server)
        .post(endpoint)
        .send({
          locale: 'american-to-british',
          text: '',
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            error: 'No text to translate',
          });

          done();
        });
    });

    test('Translation with text that needs no translation', (done) => {
      chai.request(server)
        .post(endpoint)
        .send({
          locale: 'american-to-british',
          text: 'Tea time is usually around 4 or 4.30.',
        })
        .end((err, res) => {
          assert.deepEqual(res.body, {
            text: 'Tea time is usually around 4 or 4.30.',
            translation: 'Everything looks good to me!',
          });

          done();
        });
    });

  })

});
