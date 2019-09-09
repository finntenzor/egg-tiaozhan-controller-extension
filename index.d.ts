import { Controller } from 'egg';

interface Route {
  /**
   * The class of target Controller
   */
  Controller: typeof Controller;

  /**
   * The method name of target method
   */
  methodName: string;
}

declare module 'egg' {
  // extend context
  interface Context {
    currentRoute: Route | null;
  }
}
