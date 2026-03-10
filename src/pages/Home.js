import { Lightning } from "@lightningjs/sdk";
import Sidebar from "../components/Sidebar.js";

export default class Home extends Lightning.Component {
  static _template() {
    return {
      Sidebar: {
        type: Sidebar,
      },
      Content: {
        x: 460,
        y: 0,
        w: 1460,
        h: 1080,
        rect: true,
        color: 0xff0a0a0a,
        Title: {
          x: 60,
          y: 80,
          text: {
            text: "Home",
            fontFace: "Regular",
            fontSize: 64,
            textColor: 0xff1a73e8,
          },
        },
        Description: {
          x: 60,
          y: 180,
          w: 1300,
          text: {
            text: "Welcome to InnerCityMD — Your trusted health and medical streaming network.",
            fontFace: "Regular",
            fontSize: 32,
            textColor: 0xffaaaaaa,
            wordWrapWidth: 1300,
          },
        },
      },
    };
  }

  _getFocused() {
    return this.tag("Sidebar");
  }
}
