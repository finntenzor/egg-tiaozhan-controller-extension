'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/simple/sync/body', controller.home.syncBody);
  router.get('/simple/sync/return', controller.home.syncReturn);
  router.get('/simple/async/body', controller.home.asyncBody);
  router.get('/simple/async/return', controller.home.asyncReturn);
  router.get('/complex/sync/body', controller.home.syncBodyComplex);
  router.get('/complex/sync/return', controller.home.syncReturnComplex);
  router.get('/complex/async/body', controller.home.asyncBodyComplex);
  router.get('/complex/async/return', controller.home.asyncReturnComplex);

  router.get('/simple/error', controller.home.error);
};
