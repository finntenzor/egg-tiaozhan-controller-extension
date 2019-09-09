'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/response.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/response',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  const itShouldEqualsTiaozhan = url => {
    it('should equals tiaozhan at ' + url, async () => {
      const response = await app.httpRequest().get(url);
      const text = response.text;
      const status = response.status;

      assert(text);
      assert(text === 'tiaozhan');
      assert(status === 200);
    });
  };

  const itShouldHasTiaozhanMessage = url => {
    it('should has tiaozhan message at ' + url, async () => {
      const response = await app.httpRequest().get(url);
      const body = response.body;
      const status = response.status;

      assert(body);
      assert(body.message);
      assert(body.message === 'tiaozhan');
      assert(status === 200);
    });
  };

  itShouldEqualsTiaozhan('/simple/sync/body');
  itShouldEqualsTiaozhan('/simple/sync/return');
  itShouldEqualsTiaozhan('/simple/async/body');
  itShouldEqualsTiaozhan('/simple/async/return');

  itShouldHasTiaozhanMessage('/complex/sync/body');
  itShouldHasTiaozhanMessage('/complex/sync/return');
  itShouldHasTiaozhanMessage('/complex/async/body');
  itShouldHasTiaozhanMessage('/complex/async/return');

  it('should 500 at /simple/error', async () => {
    const response = await app.httpRequest().get('/simple/error');
    const text = response.text;
    const status = response.status;

    assert(text);
    assert(text === 'tiaozhan');
    assert(status === 500);
  });
});
