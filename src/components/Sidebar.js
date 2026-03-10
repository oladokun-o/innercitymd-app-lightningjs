import { Lightning, Router } from '@lightningjs/sdk';
import { MENU_ITEMS } from '../constants/links.js';

const ICONS = ['⌂', '✚', '◉', '▶', '☎'];

export default class Sidebar extends Lightning.Component {
  static _template() {
    return {
      x: 0, y: 0,
      w: 420, h: 1080,
      // Sidebar background with gradient
      Bg: {
        x: 0, y: 0, w: 420, h: 1080,
        rect: true,
        colorLeft: 0xff0d0d0d,
        colorRight: 0xff080808,
      },
      // Right border
      Border: {
        x: 418, y: 0, w: 2, h: 1080,
        rect: true,
        color: 0xff1e1e1e,
      },
      // Logo area
      LogoBg: {
        x: 0, y: 0, w: 420, h: 140,
        rect: true,
        colorTop: 0xff0a1a3a,
        colorBottom: 0xff080808,
      },
      LogoAccent: {
        x: 32, y: 52,
        w: 5, h: 48,
        rect: true,
        color: 0xff1a73e8,
      },
      LogoText: {
        x: 50, y: 52,
        text: {
          text: 'InnerCity',
          fontFace: 'Regular',
          fontSize: 30,
          textColor: 0xffffffff,
          fontStyle: 'bold',
        },
      },
      LogoMD: {
        x: 50, y: 84,
        text: {
          text: 'MD',
          fontFace: 'Regular',
          fontSize: 24,
          textColor: 0xff1a73e8,
          fontStyle: 'bold',
        },
      },
      LogoTagline: {
        x: 88, y: 91,
        text: {
          text: 'Health Network',
          fontFace: 'Regular',
          fontSize: 15,
          textColor: 0xff666666,
        },
      },
      // Divider below logo
      LogoDivider: {
        x: 32, y: 148,
        w: 356, h: 1,
        rect: true,
        color: 0xff1e1e1e,
      },
      // Nav label
      NavLabel: {
        x: 32, y: 162,
        text: {
          text: 'NAVIGATION',
          fontFace: 'Regular',
          fontSize: 11,
          textColor: 0xff444444,
        },
      },
      // Menu items
      Menu: {
        x: 24, y: 185,
        children: MENU_ITEMS.map((item, i) => ({
          ref: item.ref,
          w: 372, h: 56,
          y: i * 66,
          rect: true,
          color: 0xff0d0d0d,
          // Left accent bar (visible when selected)
          Accent: {
            x: 0, y: 0, w: 3, h: 56,
            rect: true,
            color: 0x001a73e8,
          },
          // Icon
          Icon: {
            x: 14, y: 14,
            text: {
              text: ICONS[i] || '●',
              fontFace: 'Regular',
              fontSize: 22,
              textColor: 0xff555555,
            },
          },
          // Label
          Label: {
            x: 48, y: 15,
            text: {
              text: item.label || '',
              fontFace: 'Regular',
              fontSize: 20,
              textColor: 0xff777777,
            },
          },
        })),
      },
      // Bottom section
      BottomDivider: {
        x: 32, y: 960,
        w: 356, h: 1,
        rect: true,
        color: 0xff1e1e1e,
      },
      LiveBadge: {
        x: 32, y: 976,
        w: 70, h: 22,
        rect: true,
        color: 0xffe53935,
        LiveDot: {
          x: 8, y: 5, w: 8, h: 8,
          rect: true,
          color: 0xffffffff,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 4 },
        },
        LiveText: {
          x: 22, y: 3,
          text: { text: 'LIVE', fontFace: 'Regular', fontSize: 12, textColor: 0xffffffff },
        },
      },
      LiveLabel: {
        x: 114, y: 977,
        text: {
          text: 'InnerCityMD  ON AIR',
          fontFace: 'Regular',
          fontSize: 14,
          textColor: 0xff555555,
        },
      },
      VersionText: {
        x: 32, y: 1008,
        text: {
          text: 'v1.0.0  ·  com.innercitymd.app',
          fontFace: 'Regular',
          fontSize: 13,
          textColor: 0xff333333,
        },
      },
    };
  }

  _init() {
    this._focusIndex = 0;
    this._applySelection(0);
  }

  _focus() {
    const activeRoute = Router.getActiveRoute();
    const idx = MENU_ITEMS.findIndex(m => m.path === activeRoute);
    if (idx !== -1) {
      this._focusIndex = idx;
    }
    this._applySelection(this._focusIndex);
  }

  _applySelection(index) {
    const menu = this.tag('Menu');
    if (!menu) return;
    menu.children.forEach((child, i) => {
      const isActive = i === index;
      child.patch({
        smooth: { color: [isActive ? 0xff111e33 : 0xff0d0d0d, { duration: 0.15 }] },
        Accent: { smooth: { color: [isActive ? 0xff1a73e8 : 0x001a73e8, { duration: 0.15 }] } },
        Icon:   { text: { textColor: isActive ? 0xff1a73e8 : 0xff555555 } },
        Label:  { text: { textColor: isActive ? 0xffffffff : 0xff777777 } },
      });
    });
  }

  _handleDown() {
    const prev = this._focusIndex;
    this._focusIndex = Math.min(MENU_ITEMS.length - 1, this._focusIndex + 1);
    if (this._focusIndex !== prev) {
      this._applySelection(this._focusIndex);
    }
  }

  _handleUp() {
    const prev = this._focusIndex;
    this._focusIndex = Math.max(0, this._focusIndex - 1);
    if (this._focusIndex !== prev) {
      this._applySelection(this._focusIndex);
    }
  }

  _handleEnter() {
    const item = MENU_ITEMS[this._focusIndex];
    if (item) Router.navigate(item.path);
  }

  _handleRight() {
    this.fireAncestors('$focusContent');
  }

  _getFocused() {
    return this;
  }
}
