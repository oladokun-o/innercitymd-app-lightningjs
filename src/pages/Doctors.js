import { Lightning } from "@lightningjs/sdk";
import Sidebar from "../components/Sidebar.js";

export default class Doctors extends Lightning.Component {
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
            text: "Doctors",
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
            text: "Explore our network of experienced doctors across various specialties, ready to provide you with top-notch care and medical advice.",
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
