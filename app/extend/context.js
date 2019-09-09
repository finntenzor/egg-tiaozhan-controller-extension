'use strict';

/**
 * 获取当前请求的路由
 * @param {import("egg").Context} ctx 当前上下文
 */
function getCurrentRoute(ctx) {
  const match = ctx.app.router.match(ctx.request.path, ctx.request.method);
  const firstLayer = match.path[0];
  if (firstLayer) {
    const stack = [ ...firstLayer.stack ];
    const lastMiddleware = stack.pop();
    if (lastMiddleware.Controller && lastMiddleware.key) {
      return {
        Controller: lastMiddleware.Controller,
        methodName: lastMiddleware.key,
      };
    }
  }
  return null;
}

module.exports = {
  get currentRoute() {
    return getCurrentRoute(this);
  },
};
