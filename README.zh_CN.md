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

对控制器层的扩展，包括：

1. 包装的中间件保留控制器和调用方法的相关信息，可以动态获取。

2. 扩展Context，可以获取当前请求的路由`ctx.currentRoute`，包含两个属性`Controller`: 当前请求的目标控制器（类的引用，不是实例的引用），`methodName`: 当前请求的目标调用方法名。

3. 扩展返回方式，可以直接通过return的方式返回响应，响应代码保持不变。

## 依赖说明

### 依赖的 egg 版本

egg-tiaozhan-controller-extension 版本 | egg 2.x
--- | ---
2.x | 😁
1.x | ❌
0.x | ❌

### 依赖的插件

无

## 开启插件

```js
// config/plugin.js
exports.tiaozhanControllerExtension = {
  enable: true,
  package: 'egg-tiaozhan-controller-extension',
};
```

## 使用场景

- Why and What:

1. 当你想获取当前请求的最终目标位置时；
2. 当你想利用元数据时；
3. 当你想要用return简单地返回响应时；

- How:

### 获取当前请求的目标位置

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

### 使用元数据

```js
class HomeController extends Controller {
  helloEgg() {
    // some code
  }
}

// Need reflect-metadata
Reflect.defineMetadata('mykey', { meta: 123 }, HomeController.prototype);
```

### 用return返回响应

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

## 详细配置

没有配置

## 单元测试

不需要额外测试

## 其他

此扩展通过动态修改EggRouter和EggLoader的方式来实现功能，对Eggjs版本依赖很严重。
如有需要，请参考源代码中hack文件夹里的`MODIFIED`注释的部分，跟原版对比，自行修改。

## 提问交流

请直接提PR

## License

[MIT](LICENSE)
