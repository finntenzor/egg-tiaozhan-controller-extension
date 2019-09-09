# egg-tiaozhan-controller-extension

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-tiaozhan-controller-extension.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-tiaozhan-controller-extension
[travis-image]: https://img.shields.io/travis/eggjs/egg-tiaozhan-controller-extension.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-tiaozhan-controller-extension
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-tiaozhan-controller-extension.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-tiaozhan-controller-extension?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-tiaozhan-controller-extension.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-tiaozhan-controller-extension
[snyk-image]: https://snyk.io/test/npm/egg-tiaozhan-controller-extension/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-tiaozhan-controller-extension
[download-image]: https://img.shields.io/npm/dm/egg-tiaozhan-controller-extension.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-tiaozhan-controller-extension

Tiaozhan Controller Extension

1. Get current route from `ctx.currentRoute`. `ctx.currentRoute.Controller` for the target Controller class and `ctx.currentRoute.methodName` for the target method name.

2. Return response by `return`.

## Install

```bash
$ npm i egg-tiaozhan-controller-extension --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.tiaozhanControllerExtension = {
  enable: true,
  package: 'egg-tiaozhan-controller-extension',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.tiaozhanControllerExtension = {
};
```

No Configuration.

## Example

### Get Current Route

```js
class HomeController extends Controller {
  helloEgg() {
    // 也可以在中间件等环境使用
    const route = this.ctx.currentRoute;
    // route.Controller === HomeController
    // route.Controller.prototype === HomeController.prototype
    // route.methodName === 'helloEgg'
  }
}
```

### Use Reflect

```js
class HomeController extends Controller {
  helloEgg() {
    // some code
  }
}

// Need reflect-metadata
Reflect.defineMetadata('mykey', { meta: 123 }, HomeController.prototype);
```

### Use return to response

```js
class HomeController extends Controller {
  simpleText() {
    return 'hi, egg';
  }

  complexBody() {
    return {
      message: 'hi, egg',
    };
  }
}
```

## Questions & Suggestions

Please open a PR.

## License

[MIT](LICENSE)
