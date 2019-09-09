'use strict';

const HackRouter = require('./egg-router.js');
const hackLoadController = require('./controller');

const EggRouter = require('@eggjs/router/lib/egg_router');
const EggLoader = require('egg-core/lib/loader/egg_loader');

module.exports = () => {
  EggLoader.prototype.loadController = hackLoadController;
  EggRouter.prototype.register = HackRouter.prototype.register;
};
