import { Lightning } from "@lightningjs/sdk";
import Hls from "hls.js";

export default class VideoPlayer extends Lightning.Component {
  static _template() {
    return {
      w: 1460,
      h: 820,
      rect: true,
      color: 0xff000000,
      Overlay: {
        x: 0,
        y: 0,
        w: 1460,
        h: 820,
        rect: true,
        color: 0x88000000,
        visible: false,
        PlayIcon: {
          mount: 0.5,
          x: 730,
          y: 380,
          text: {
            text: "⏸",
            fontSize: 120,
            textColor: 0xffffffff,
          },
        },
        ProgressBar: {
          x: 60,
          y: 750,
          w: 1340,
          h: 8,
          rect: true,
          color: 0xff444444,
          Progress: {
            x: 0,
            y: 0,
            w: 0,
            h: 8,
            rect: true,
            color: 0xff1a73e8,
          },
        },
        TimeText: {
          x: 60,
          y: 720,
          text: {
            text: "0:00 / 0:00",
            fontFace: "Regular",
            fontSize: 24,
            textColor: 0xffaaaaaa,
          },
        },
      },
    };
  }

  _setupVideo() {
    this._isPlaying = true;

    this._video = document.createElement("video");
    this._video.style.position = "absolute";
    this._video.style.top = "100px";
    this._video.style.left = "460px";
    this._video.style.width = "1460px";
    this._video.style.height = "820px";
    this._video.style.zIndex = "1";
    this._video.autoplay = true;
    this._video.muted = true;
    document.body.appendChild(this._video);

    const canvas = document.querySelector("canvas");
    if (canvas) canvas.style.zIndex = "0";

    this._hls = new Hls();
    this._hls.loadSource("https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8");
    this._hls.attachMedia(this._video);

    this._hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this._video.play();
    });

    this._interval = setInterval(() => {
      this._updateProgress();
    }, 1000);
  }

  _init() {
    this._isPlaying = true;
    this._overlayTimeout = null;
  }

  _focus() {
    console.log("VideoPlayer focused!");
    this._showOverlay();
  }

  _handleKey() {
    this._showOverlay();
  }

  _handleEnter() {
    this._togglePlay();
  }

  _handleSpace() {
    this._togglePlay();
  }

  _handleLeft() {
    this._video.currentTime = Math.max(0, this._video.currentTime - 10);
    this._showOverlay();
  }

  _handleRight() {
    this._video.currentTime = Math.min(
      this._video.duration,
      this._video.currentTime + 10,
    );
    this._showOverlay();
  }

  _handleBack() {
    this._hideOverlay();
    this.fireAncestors("$focusSidebar");
  }

  _togglePlay() {
    if (this._isPlaying) {
      this._video.pause();
      this._isPlaying = false;
      this.tag("Overlay.PlayIcon").text.text = "▶";
    } else {
      this._video.play();
      this._isPlaying = true;
      this.tag("Overlay.PlayIcon").text.text = "⏸";
    }
    this._showOverlay();
  }

  _showOverlay() {
    this.tag("Overlay").visible = true;
    this.tag("Overlay").alpha = 1;

    // Make overlay canvas appear above video
    const canvas = document.querySelector("canvas");
    if (canvas) canvas.style.zIndex = "2";

    // Auto hide after 3 seconds
    if (this._overlayTimeout) clearTimeout(this._overlayTimeout);
    this._overlayTimeout = setTimeout(() => {
      this._hideOverlay();
    }, 3000);
  }

  _hideOverlay() {
    this.tag("Overlay").visible = false;
    const canvas = document.querySelector("canvas");
    if (canvas) canvas.style.zIndex = "0";
  }

  _updateProgress() {
    if (!this._video || !this._video.duration) return;

    const current = this._video.currentTime;
    const duration = this._video.duration;
    const percent = current / duration;

    this.tag("Overlay.ProgressBar.Progress").w = Math.floor(1340 * percent);
    this.tag("Overlay.TimeText").text.text =
      `${this._formatTime(current)} / ${this._formatTime(duration)}`;
  }

  _formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  _active() {
    this._setupVideo();
  }

  _inactive() {
    if (this._interval) clearInterval(this._interval);
    if (this._overlayTimeout) clearTimeout(this._overlayTimeout);
    if (this._hls) this._hls.destroy();
    if (this._video) {
      document.body.removeChild(this._video);
      this._video = null;
    }
  }
}
