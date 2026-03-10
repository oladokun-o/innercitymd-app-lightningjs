import { Lightning } from '@lightningjs/sdk';

// Card: 260w x 185h (thumbnail 260x145, label area 40px)
export default class ContentCard extends Lightning.Component {
  static _template() {
    return {
      w: 260,
      h: 185,
      Bg: {
        w: 260, h: 145,
        rect: true,
        colorTop: 0xff1a1a1a,
        colorBottom: 0xff111111,
      },
      Badge: {
        x: 10, y: 10,
        h: 24,
        rect: true,
        color: 0xbb000000,
        BadgeText: {
          x: 8, y: 3,
          text: {
            text: '',
            fontFace: 'Regular',
            fontSize: 13,
            textColor: 0xffcccccc,
          },
        },
      },
      Duration: {
        x: 10, y: 122,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 14,
          textColor: 0xffaaaaaa,
        },
      },
      // Progress bar for "Continue Watching"
      ProgressTrack: {
        x: 0, y: 140, w: 260, h: 5,
        rect: true,
        color: 0xff333333,
        visible: false,
        ProgressFill: {
          x: 0, y: 0, w: 0, h: 5,
          rect: true,
          color: 0xff1a73e8,
        },
      },
      // Hover overlay tint
      HoverOverlay: {
        x: 0, y: 0, w: 260, h: 145,
        rect: true,
        color: 0x00ffffff,
      },
      Title: {
        x: 0, y: 152,
        w: 260,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 16,
          textColor: 0xffdddddd,
          wordWrapWidth: 260,
          maxLines: 2,
          lineHeight: 20,
        },
      },
      // Focus indicator: left bar
      FocusBar: {
        x: 0, y: 145, w: 260, h: 3,
        rect: true,
        color: 0x001a73e8,
      },
    };
  }

  set item(v) {
    this._item = v;
    this._renderItem();
  }

  _renderItem() {
    if (!this._item) return;
    const { title, duration, badge, colors, progress } = this._item;

    this.patch({
      Bg: {
        colorTop: colors.top,
        colorBottom: colors.bottom,
      },
      Badge: {
        w: badge ? badge.length * 7.5 + 16 : 0,
        BadgeText: { text: { text: badge || '' } },
      },
      Duration: { text: { text: duration || '' } },
      Title: { text: { text: title || '' } },
    });

    if (progress !== undefined) {
      this.patch({
        ProgressTrack: {
          visible: true,
          ProgressFill: { w: Math.floor(260 * progress) },
        },
      });
    }
  }

  _focus() {
    this.patch({
      FocusBar:     { smooth: { color: [0xff1a73e8, { duration: 0.15 }] } },
      HoverOverlay: { smooth: { color: [0x18ffffff, { duration: 0.15 }] } },
    });
    this.patch({ smooth: { scale: [1.06, { duration: 0.15, timingFunction: 'ease-out' }] } });
  }

  _unfocus() {
    this.patch({
      FocusBar:     { smooth: { color: [0x001a73e8, { duration: 0.15 }] } },
      HoverOverlay: { smooth: { color: [0x00ffffff, { duration: 0.15 }] } },
    });
    this.patch({ smooth: { scale: [1.0, { duration: 0.15, timingFunction: 'ease-out' }] } });
  }
}
