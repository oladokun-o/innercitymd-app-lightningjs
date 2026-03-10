import { Lightning } from '@lightningjs/sdk';
import Hls from 'hls.js';

export default class VideoPlayer extends Lightning.Component {
  static _template() {
    return {
      w: 1460, h: 820,
      rect: true,
      color: 0xff000000,
      // Overlay controls (shown on key press, auto-hides)
      Overlay: {
        x: 0, y: 0, w: 1460, h: 820,
        rect: true,
        color: 0x66000000,
        visible: false,
        // Top gradient for better contrast
        TopGrad: {
          x: 0, y: 0, w: 1460, h: 120,
          rect: true,
          colorTop: 0xaa000000,
          colorBottom: 0x00000000,
        },
        // Bottom bar gradient
        BottomGrad: {
          x: 0, y: 680, w: 1460, h: 140,
          rect: true,
          colorTop: 0x00000000,
          colorBottom: 0xdd000000,
        },
        // Center play/pause icon
        PlayIcon: {
          mount: 0.5,
          x: 730, y: 410,
          text: {
            text: '⏸',
            fontSize: 100,
            textColor: 0xffffffff,
          },
        },
        // Channel / title info (top)
        ChannelBadge: {
          x: 40, y: 30,
          w: 120, h: 28,
          rect: true,
          color: 0xffe53935,
          LiveDot: {
            x: 8, y: 7, w: 8, h: 8, rect: true, color: 0xffffffff,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 4 },
          },
          LiveText: {
            x: 22, y: 5,
            text: { text: 'LIVE', fontFace: 'Regular', fontSize: 14, textColor: 0xffffffff },
          },
        },
        ChannelName: {
          x: 176, y: 30,
          text: {
            text: 'InnerCityMD Live',
            fontFace: 'Regular',
            fontSize: 22,
            textColor: 0xffffffff,
            fontStyle: 'bold',
          },
        },
        ChannelTagline: {
          x: 176, y: 58,
          text: {
            text: 'Live Medical Programming',
            fontFace: 'Regular',
            fontSize: 16,
            textColor: 0xffaaaaaa,
          },
        },
        // Progress bar area
        ProgressTrack: {
          x: 40, y: 770, w: 1380, h: 6,
          rect: true,
          color: 0xff444444,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 3 },
          ProgressFill: {
            x: 0, y: 0, w: 0, h: 6,
            rect: true,
            color: 0xff1a73e8,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 3 },
          },
          // Playhead dot
          PlayheadDot: {
            y: -4, w: 14, h: 14,
            rect: true,
            color: 0xff1a73e8,
            shader: { type: Lightning.shaders.RoundedRectangle, radius: 7 },
          },
        },
        TimeText: {
          x: 40, y: 742,
          text: {
            text: '0:00 / 0:00',
            fontFace: 'Regular',
            fontSize: 18,
            textColor: 0xffaaaaaa,
          },
        },
        // Control hints
        HintLeft: {
          x: 40, y: 790,
          text: { text: '◀◀  –10s', fontFace: 'Regular', fontSize: 14, textColor: 0xff666666 },
        },
        HintPlay: {
          x: 660, y: 790,
          text: { text: '● Play / Pause', fontFace: 'Regular', fontSize: 14, textColor: 0xff666666 },
        },
        HintRight: {
          x: 1280, y: 790,
          text: { text: '+10s  ▶▶', fontFace: 'Regular', fontSize: 14, textColor: 0xff666666 },
        },
        HintBack: {
          x: 1350, y: 30,
          text: { text: '← Back', fontFace: 'Regular', fontSize: 14, textColor: 0xff666666 },
        },
      },
    };
  }

  // Allow parent to configure dom video position
  set domX(v) { this._domX = v; }
  set domY(v) { this._domY = v; }

  _init() {
    this._isPlaying = false;
    this._overlayTimeout = null;
  }

  _active() {
    this._setupVideo();
  }

  _setupVideo() {
    this._isPlaying = true;
    this._video = document.createElement('video');

    const x = this._domX !== undefined ? this._domX : 460;
    const y = this._domY !== undefined ? this._domY : 80;

    Object.assign(this._video.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: '1460px',
      height: '820px',
      zIndex: '1',
      backgroundColor: '#000',
    });
    this._video.autoplay = true;
    this._video.muted = true;
    document.body.appendChild(this._video);

    const canvas = document.querySelector('canvas');
    if (canvas) canvas.style.zIndex = '0';

    this._hls = new Hls();
    this._hls.loadSource('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');
    this._hls.attachMedia(this._video);
    this._hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this._video.play();
    });

    this._progressInterval = setInterval(() => this._updateProgress(), 1000);
  }

  _focus() {
    this._showOverlay();
  }

  _handleKey() {
    this._showOverlay();
  }

  _handleEnter() {
    this._togglePlay();
  }

  _handleLeft() {
    if (this._video) {
      this._video.currentTime = Math.max(0, this._video.currentTime - 10);
    }
    this._showOverlay();
  }

  _handleRight() {
    if (this._video && this._video.duration) {
      this._video.currentTime = Math.min(this._video.duration, this._video.currentTime + 10);
    }
    this._showOverlay();
  }

  _handleBack() {
    this._hideOverlay();
    this.fireAncestors('$focusSidebar');
  }

  _handleUp() {
    this._showOverlay();
  }

  _handleDown() {
    this._showOverlay();
  }

  _togglePlay() {
    if (!this._video) return;
    if (this._isPlaying) {
      this._video.pause();
      this._isPlaying = false;
      this.tag('Overlay.PlayIcon').patch({ text: { text: '▶' } });
    } else {
      this._video.play();
      this._isPlaying = true;
      this.tag('Overlay.PlayIcon').patch({ text: { text: '⏸' } });
    }
    this._showOverlay();
  }

  _showOverlay() {
    const overlay = this.tag('Overlay');
    overlay.visible = true;
    overlay.alpha = 1;

    // Raise canvas above video so overlay renders on top
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.style.zIndex = '2';

    if (this._overlayTimeout) clearTimeout(this._overlayTimeout);
    this._overlayTimeout = setTimeout(() => this._hideOverlay(), 4000);
  }

  _hideOverlay() {
    this.tag('Overlay').visible = false;
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.style.zIndex = '0';
  }

  _updateProgress() {
    if (!this._video || !this._video.duration) return;

    const cur  = this._video.currentTime;
    const dur  = this._video.duration;
    const pct  = cur / dur;
    const barW = Math.floor(1380 * pct);

    this.tag('Overlay.ProgressTrack.ProgressFill').patch({ w: barW });
    this.tag('Overlay.ProgressTrack.PlayheadDot').patch({ x: barW - 7 });
    this.tag('Overlay.TimeText').patch({ text: { text: `${this._fmt(cur)}  /  ${this._fmt(dur)}` } });
  }

  _fmt(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2, '0')}`;
  }

  _inactive() {
    if (this._progressInterval) clearInterval(this._progressInterval);
    if (this._overlayTimeout) clearTimeout(this._overlayTimeout);
    if (this._hls) {
      this._hls.destroy();
      this._hls = null;
    }
    if (this._video) {
      this._video.pause();
      document.body.removeChild(this._video);
      this._video = null;
    }
    const canvas = document.querySelector('canvas');
    if (canvas) canvas.style.zIndex = '0';
  }
}
