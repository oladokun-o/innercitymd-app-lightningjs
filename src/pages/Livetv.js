import { Lightning } from "@lightningjs/sdk";
import Sidebar from "../components/Sidebar.js";
import VideoPlayer from "../components/VideoPlayer.js";

export default class LiveTV extends Lightning.Component {
  static _template() {
    return {
      w: 1920,
      h: 1080,
      rect: true,
      color: 0xff0a0a0a,
      Sidebar: {
        type: Sidebar,
      },
      Content: {
        x: 460,
        y: 0,
        w: 1460,
        h: 1080,
        Title: {
          x: 60,
          y: 40,
          text: {
            text: "Live TV",
            fontFace: "Regular",
            fontSize: 48,
            textColor: 0xff1a73e8,
          },
        },
        Player: {
          x: 0,
          y: 100,
          type: VideoPlayer,
        },
      },
    };
  }

  _init() {
    this._playerFocused = false;
  }

  _getFocused() {
    return this._playerFocused
      ? this.tag("Content.Player")
      : this.tag("Sidebar");
  }

  _handleEnter() {
    console.log("Enter pressed, playerFocused:", this._playerFocused);
    if (!this._playerFocused) {
      this._playerFocused = true;
      this._refocus();
    }
  }

  $focusPlayer() {
    console.log("Switching to player!");
    this._playerFocused = true;
    this._refocus();
  }
}
