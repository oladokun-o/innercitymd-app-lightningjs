import { Lightning } from '@lightningjs/sdk';

export default class HeroBanner extends Lightning.Component {
  static _template() {
    return {
      w: 1500, h: 380,
      // Background gradient — simulates a scene
      BgLeft: {
        x: 0, y: 0, w: 750, h: 380,
        rect: true,
        colorLeft: 0xff040f22,
        colorRight: 0xff0d3b7a,
      },
      BgRight: {
        x: 750, y: 0, w: 750, h: 380,
        rect: true,
        colorLeft: 0xff0d3b7a,
        colorRight: 0xff051b3f,
      },
      // Gradient vignette overlay on left for text legibility
      Vignette: {
        x: 0, y: 0, w: 620, h: 380,
        rect: true,
        colorLeft: 0xee040f22,
        colorRight: 0x00040f22,
      },
      // Bottom fade
      BottomFade: {
        x: 0, y: 310, w: 1500, h: 70,
        rect: true,
        colorTop: 0x000a0a0a,
        colorBottom: 0xff0a0a0a,
      },
      // Category badge
      CategoryBadge: {
        x: 60, y: 60,
        w: 140, h: 28,
        rect: true,
        color: 0xff1a73e8,
        CategoryText: {
          x: 10, y: 4,
          text: {
            text: 'CARDIOLOGY',
            fontFace: 'Regular',
            fontSize: 14,
            textColor: 0xffffffff,
          },
        },
      },
      Title: {
        x: 60, y: 106,
        w: 680,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 52,
          textColor: 0xffffffff,
          wordWrapWidth: 680,
          maxLines: 2,
          lineHeight: 58,
          fontStyle: 'bold',
        },
      },
      Subtitle: {
        x: 60, y: 178,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 18,
          textColor: 0xff1a73e8,
        },
      },
      Description: {
        x: 60, y: 210,
        w: 640,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 20,
          textColor: 0xffbbbbbb,
          wordWrapWidth: 640,
          maxLines: 3,
          lineHeight: 28,
        },
      },
      // Meta row (year · rating · duration)
      Meta: {
        x: 60, y: 300,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 16,
          textColor: 0xff888888,
        },
      },
      // Action buttons
      BtnPlay: {
        x: 60, y: 326,
        w: 160, h: 44,
        rect: true,
        color: 0xff1a73e8,
        BtnPlayIcon: {
          x: 16, y: 9,
          text: { text: '▶', fontFace: 'Regular', fontSize: 18, textColor: 0xffffffff },
        },
        BtnPlayLabel: {
          x: 42, y: 10,
          text: { text: 'Play Now', fontFace: 'Regular', fontSize: 18, textColor: 0xffffffff },
        },
      },
      BtnInfo: {
        x: 234, y: 326,
        w: 160, h: 44,
        rect: true,
        color: 0x44ffffff,
        BtnInfoLabel: {
          x: 28, y: 10,
          text: { text: 'More Info', fontFace: 'Regular', fontSize: 18, textColor: 0xffffffff },
        },
      },
    };
  }

  set data(v) {
    this._data = v;
    this._render();
  }

  _render() {
    if (!this._data) return;
    const d = this._data;
    this.patch({
      CategoryBadge: {
        CategoryText: { text: { text: (d.category || '').toUpperCase() } },
      },
      Title:       { text: { text: d.title || '' } },
      Subtitle:    { text: { text: d.subtitle || '' } },
      Description: { text: { text: d.description || '' } },
      Meta:        { text: { text: `${d.year || ''}  ·  ${d.rating || ''}  ·  ${d.duration || ''}` } },
    });
  }
}
