import { Lightning, Router } from "@lightningjs/sdk";
import { MENU_ITEMS } from "../constants/links";

export default class Sidebar extends Lightning.Component {
  static _routes() {
    const routes = [];
    // add property "route" to each menu item
    MENU_ITEMS.forEach((item) => {
      routes.push({ ...item, route: item.path });
    });
    return routes;
  }

  static _template() {
    return {
      x: 0,
      y: 0,
      w: 420,
      h: 1080,
      rect: true,
      color: 0xff0a0a0a,
      Header: {
        x: 40,
        y: 60,
        text: {
          text: "InnerCityMD",
          fontFace: "Regular",
          fontSize: 36,
          textColor: 0xff1a73e8,
        },
      },
      Tagline: {
        x: 40,
        y: 110,
        text: {
          text: "Your Health, Our Priority",
          fontFace: "Regular",
          fontSize: 18,
          textColor: 0xffaaaaaa,
        },
      },
      Menu: {
        x: 40,
        y: 240,
        children: Sidebar._routes().map((item, index) => ({
          ref: item.ref,
          w: 340,
          h: 64,
          y: index * 76,
          rect: true,
          color: index === 0 ? 0xff1a73e8 : 0xff1a1a1a,
          route: item.route,
          Label: {
            x: 20,
            y: 16,
            text: {
              text: item.label,
              fontFace: "Regular",
              fontSize: 26,
              textColor: 0xffffffff,
            },
          },
        })),
      },
    };
  }

  _init() {
    this._focusIndex = 0;
  }

  _handleDown() {
    this._moveFocus(1);
  }

  _handleUp() {
    this._moveFocus(-1);
  }

  _handleEnter() {
    const item = this.tag("Menu").children[this._focusIndex];
    Router.navigate(item.route);
  }

  _moveFocus(direction) {
    const total = 5;
    const prev = this._focusIndex;
    this._focusIndex = Math.max(
      0,
      Math.min(total - 1, this._focusIndex + direction),
    );

    this.tag("Menu").children[prev].color = 0xff1a1a1a;
    this.tag("Menu").children[this._focusIndex].color = 0xff1a73e8;
  }

  _getFocused() {
    return this;
  }

  _focus() {
    this._routes = MENU_ITEMS.map((item) => item.path);

    const activeRoute = Router.getActiveRoute();
    const activeIndex = this._routes.indexOf(activeRoute);

    // Reset all items first
    this.tag("Menu").children.forEach((child) => (child.color = 0xff1a1a1a));

    if (activeIndex !== -1) {
      this._focusIndex = activeIndex;
      this.tag("Menu").children[activeIndex].color = 0xff1a73e8;
    }
  }

  _handleRight() {
    this.fireAncestors("$focusPlayer");
  }
}
