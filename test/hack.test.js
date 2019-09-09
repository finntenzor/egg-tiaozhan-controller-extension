'use strict';

const mock = require('egg-mock');
const HomeController = require('./fixtures/apps/hack/app/controller/home');
const assert = require('assert');

describe('test/hack.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/hack',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should has router', () => {
    const match = app.router.match('/', 'GET');
    const firstLayer = match.path[0];
    const stack = [ ...firstLayer.stack ];
    const lastMiddleware = stack.pop();

    assert(lastMiddleware);
    assert(lastMiddleware.Controller);
    assert(lastMiddleware.key);
    assert(lastMiddleware.Controller === HomeController);
    assert(lastMiddleware.Controller.prototype === HomeController.prototype);
    assert(lastMiddleware.key === 'index');
  });

  it('should context has currentRoute', async () => {
    const ctx = app.mockContext();

    assert(ctx);
    assert(ctx.currentRoute);
    assert(ctx.currentRoute.Controller);
    assert(ctx.currentRoute.methodName);
    assert(ctx.currentRoute.Controller === HomeController);
    assert(ctx.currentRoute.Controller.prototype === HomeController.prototype);
    assert(ctx.currentRoute.methodName === 'index');
  });
});
