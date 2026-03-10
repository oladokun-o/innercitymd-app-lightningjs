import { Lightning } from '@lightningjs/sdk';
import Sidebar from '../components/Sidebar.js';
import VideoPlayer from '../components/VideoPlayer.js';

const CHANNELS = [
  { id: 1, name: 'InnerCityMD Live',  tagline: 'Live Medical Programming',      color: 0xff1a73e8 },
  { id: 2, name: 'Health Now',        tagline: 'Breaking Health News',           color: 0xff34a853 },
  { id: 3, name: 'Wellness 24/7',     tagline: '24/7 Wellness & Lifestyle',      color: 0xffad1457 },
  { id: 4, name: 'Med Ed Channel',    tagline: 'Medical Education & Training',   color: 0xffef6c00 },
];

export default class LiveTV extends Lightning.Component {
  static _template() {
    return {
      w: 1920, h: 1080,
      Sidebar: { type: Sidebar },
      Content: {
        x: 460, y: 0,
        w: 1460, h: 1080,
        rect: true,
        color: 0xff0a0a0a,
        // Page title bar
        TitleBar: {
          x: 0, y: 0, w: 1460, h: 80,
          rect: true,
          colorTop: 0xff0d1a2e,
          colorBottom: 0xff0a0a0a,
          LiveBadge: {
            x: 40, y: 22,
            w: 70, h: 28,
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
          PageTitle: {
            x: 126, y: 22,
            text: {
              text: 'Live Television',
              fontFace: 'Regular',
              fontSize: 28,
              textColor: 0xffffffff,
              fontStyle: 'bold',
            },
          },
          PageSubtitle: {
            x: 126, y: 54,
            text: {
              text: 'Live streaming medical programming',
              fontFace: 'Regular',
              fontSize: 15,
              textColor: 0xff555555,
            },
          },
        },
        // Video player
        Player: {
          x: 0, y: 80,
          type: VideoPlayer,
          domX: 460,
          domY: 80,
        },
        // Channel list panel (right overlay when sidebar focused)
        ChannelPanel: {
          x: 1060, y: 80,
          w: 400, h: 820,
          rect: true,
          color: 0xee0d0d0d,
          visible: false,
          PanelTitle: {
            x: 24, y: 20,
            text: {
              text: 'CHANNELS',
              fontFace: 'Regular',
              fontSize: 14,
              textColor: 0xff444444,
            },
          },
          Channels: {
            x: 0, y: 50,
            children: CHANNELS.map((ch, i) => ({
              ref: `Ch${i}`,
              x: 0, y: i * 78,
              w: 400, h: 70,
              rect: true,
              color: i === 0 ? 0xff151f2e : 0xff111111,
              Accent: {
                x: 0, y: 0, w: 4, h: 70,
                rect: true,
                color: i === 0 ? ch.color : 0xff222222,
              },
              ChNum: {
                x: 20, y: 10,
                text: {
                  text: `CH ${i + 1}`,
                  fontFace: 'Regular',
                  fontSize: 12,
                  textColor: 0xff555555,
                },
              },
              ChName: {
                x: 20, y: 28,
                text: {
                  text: ch.name,
                  fontFace: 'Regular',
                  fontSize: 18,
                  textColor: i === 0 ? 0xffffffff : 0xffaaaaaa,
                  fontStyle: i === 0 ? 'bold' : 'normal',
                },
              },
              ChTagline: {
                x: 20, y: 52,
                text: {
                  text: ch.tagline,
                  fontFace: 'Regular',
                  fontSize: 13,
                  textColor: 0xff555555,
                },
              },
              LiveBadge: {
                x: 320, y: 22,
                w: 52, h: 20,
                rect: true,
                color: 0xffe53935,
                visible: i === 0,
                ChLiveText: {
                  x: 6, y: 3,
                  text: { text: 'LIVE', fontFace: 'Regular', fontSize: 11, textColor: 0xffffffff },
                },
              },
            })),
          },
        },
      },
    };
  }

  _init() {
    this._playerFocused = false;
  }

  _getFocused() {
    if (this._playerFocused) return this.tag('Content.Player');
    return this.tag('Sidebar');
  }

  $focusContent() {
    this._playerFocused = true;
    this.tag('Content.ChannelPanel').visible = false;
    this._refocus();
  }

  // Alias: used by VideoPlayer back key
  $focusSidebar() {
    this._playerFocused = false;
    this._refocus();
  }
}
