import { Router, Utils } from "@lightningjs/sdk";
import { MENU_ITEMS } from "./constants/links";

export default class App extends Router.App {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  static _routes() {
    return MENU_ITEMS;
  }

  _setup() {
    Router.startRouter({
      root: "home",
      routes: App._routes(),
    });
  }
}
