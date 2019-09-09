'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  syncBody() {
    this.ctx.body = 'tiaozhan';
  }

  syncReturn() {
    return 'tiaozhan';
  }

  async asyncBody() {
    this.ctx.body = 'tiaozhan';
  }

  async asyncReturn() {
    return 'tiaozhan';
  }

  syncBodyComplex() {
    this.ctx.body = {
      message: 'tiaozhan',
    };
  }

  syncReturnComplex() {
    return {
      message: 'tiaozhan',
    };
  }

  async asyncBodyComplex() {
    this.ctx.body = {
      message: 'tiaozhan',
    };
  }

  async asyncReturnComplex() {
    return {
      message: 'tiaozhan',
    };
  }

  error() {
    this.ctx.status = 500;
    return 'tiaozhan';
  }
}

module.exports = HomeController;
