import { Lightning } from '@lightningjs/sdk';

// Card: 310w x 340h
export default class DoctorCard extends Lightning.Component {
  static _template() {
    return {
      w: 310, h: 340,
      // Card background
      CardBg: {
        x: 0, y: 0, w: 310, h: 340,
        rect: true,
        color: 0xff161616,
      },
      // Top accent bar
      AccentBar: {
        x: 0, y: 0, w: 310, h: 4,
        rect: true,
        color: 0xff1a73e8,
      },
      // Avatar circle background
      AvatarBg: {
        x: 95, y: 32,
        w: 120, h: 120,
        rect: true,
        color: 0xff1a73e8,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 60 },
        Initials: {
          mount: 0.5,
          x: 60, y: 60,
          text: {
            text: '',
            fontFace: 'Regular',
            fontSize: 40,
            textColor: 0xffffffff,
            fontStyle: 'bold',
          },
        },
      },
      // Online/available dot
      StatusDot: {
        x: 196, y: 128,
        w: 18, h: 18,
        rect: true,
        color: 0xff34a853,
        shader: { type: Lightning.shaders.RoundedRectangle, radius: 9 },
      },
      Name: {
        mount: 0.5,
        x: 155, y: 172,
        w: 280,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 20,
          textColor: 0xffffffff,
          textAlign: 'center',
          wordWrapWidth: 280,
          maxLines: 1,
          fontStyle: 'bold',
        },
      },
      Specialty: {
        mount: 0.5,
        x: 155, y: 200,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 16,
          textColor: 0xff1a73e8,
          textAlign: 'center',
        },
      },
      // Rating + years
      RatingRow: {
        mount: 0.5,
        x: 155, y: 228,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 15,
          textColor: 0xff888888,
          textAlign: 'center',
        },
      },
      // Divider
      Divider: {
        x: 30, y: 256,
        w: 250, h: 1,
        rect: true,
        color: 0xff2a2a2a,
      },
      // Availability status
      AvailLabel: {
        x: 30, y: 270,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 14,
          textColor: 0xff34a853,
        },
      },
      // Book button
      BookBtn: {
        x: 30, y: 296,
        w: 250, h: 34,
        rect: true,
        color: 0xff1a73e8,
        BtnLabel: {
          mount: 0.5,
          x: 125, y: 17,
          text: {
            text: 'Book Consultation',
            fontFace: 'Regular',
            fontSize: 15,
            textColor: 0xffffffff,
          },
        },
      },
      // Focus border
      FocusBorder: {
        x: -2, y: -2, w: 314, h: 344,
        rect: true,
        color: 0x001a73e8,
        zIndex: -1,
      },
    };
  }

  set doctor(v) {
    this._doctor = v;
    this._render();
  }

  _render() {
    if (!this._doctor) return;
    const d = this._doctor;
    this.patch({
      AvatarBg: {
        color: d.avatarColor || 0xff1a73e8,
        Initials: { text: { text: d.initials || '??' } },
      },
      StatusDot: { color: d.available ? 0xff34a853 : 0xff888888 },
      Name:      { text: { text: d.name || '' } },
      Specialty: { text: { text: d.specialty || '' } },
      RatingRow: { text: { text: `★ ${d.rating || ''}  ·  ${d.years || ''}` } },
      AvailLabel: {
        text: {
          text: d.available ? '● Available Now' : `○ Next: ${d.nextAvail || 'N/A'}`,
          textColor: d.available ? 0xff34a853 : 0xff888888,
        },
      },
    });
  }

  _focus() {
    this.patch({
      CardBg:     { smooth: { color: [0xff202020, { duration: 0.15 }] } },
      FocusBorder: { smooth: { color: [0xff1a73e8, { duration: 0.15 }] } },
      AccentBar:  { smooth: { color: [0xff4a93ff, { duration: 0.15 }] } },
    });
    this.patch({ smooth: { scale: [1.04, { duration: 0.15, timingFunction: 'ease-out' }] } });
  }

  _unfocus() {
    this.patch({
      CardBg:     { smooth: { color: [0xff161616, { duration: 0.15 }] } },
      FocusBorder: { smooth: { color: [0x001a73e8, { duration: 0.15 }] } },
      AccentBar:  { smooth: { color: [0xff1a73e8, { duration: 0.15 }] } },
    });
    this.patch({ smooth: { scale: [1.0, { duration: 0.15, timingFunction: 'ease-out' }] } });
  }
}
