'use strict';

const is = require('is-type-of');
const Router = require('@eggjs/router/lib/router');
const utils = require('@eggjs/router/lib/utils');

/**
 * from
 * node_modules\@eggjs\router\lib\egg_router.js
 */

class HackRouter extends Router {
  /**
   * Create and register a route.
   * @param {String} path - url path
   * @param {Array} methods - Array of HTTP verbs
   * @param {Array} middlewares -
   * @param {Object} opts -
   * @return {Route} this
   */
  register(path, methods, middlewares, opts) {
    // patch register to support generator function middleware and string controller
    middlewares = Array.isArray(middlewares) ? middlewares : [ middlewares ];
    middlewares = convertMiddlewares(middlewares, this.app);
    path = Array.isArray(path) ? path : [ path ];
    path.forEach(p => super.register(p, methods, middlewares, opts));
    return this;
  }
}

/**
 * resolve controller from string to function
 * @param  {String|Function} controller input controller
 * @param  {Application} app egg application instance
 * @return {Function} controller function
 */
function resolveController(controller, app) {
  if (is.string(controller)) {
    const actions = controller.split('.');
    let obj = app.controller;
    actions.forEach(key => {
      obj = obj[key];
      if (!obj) throw new Error(`controller '${controller}' not exists`);
    });
    controller = obj;
  }
  // ensure controller is exists
  if (!controller) throw new Error('controller not exists');
  return controller;
}

/**
 * 1. ensure controller(last argument) support string
 * - [url, controller]: app.get('/home', 'home');
 * - [name, url, controller(string)]: app.get('posts', '/posts', 'posts.list');
 * - [name, url, controller]: app.get('posts', '/posts', app.controller.posts.list);
 * - [name, url(regexp), controller]: app.get('regRouter', /\/home\/index/, 'home.index');
 * - [name, url, middleware, [...], controller]: `app.get(/user/:id', hasLogin, canGetUser, 'user.show');`
 *
 * 2. make middleware support generator function
 *
 * @param  {Array} middlewares middlewares and controller(last middleware)
 * @param  {Application} app  egg application instance
 * @return {Array} middlewares
 */
function convertMiddlewares(middlewares, app) {
  // ensure controller is resolved
  const controller = resolveController(middlewares.pop(), app);
  // make middleware support generator function
  middlewares = middlewares.map(utils.middleware);
  const wrappedController = (ctx, next) => {
    return utils.callFn(controller, [ ctx, next ], ctx);
  };
  // ############
  // # MODIFIED #
  // ############
  wrappedController.Controller = controller.Controller;
  wrappedController.key = controller.key;
  return middlewares.concat([ wrappedController ]);
}

module.exports = HackRouter;
