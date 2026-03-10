import { Lightning } from '@lightningjs/sdk';
import Sidebar from '../components/Sidebar.js';
import { DOCTORS } from '../data/content.js';

const SERVICE_CARDS = [
  {
    icon: '📹',
    title: 'Video Consult',
    desc: 'Face-to-face HD video with your doctor',
    detail: 'Available Now',
    detailColor: 0xff34a853,
    color: 0xff0d2b4a,
    accentColor: 0xff1a73e8,
  },
  {
    icon: '📞',
    title: 'Phone Consult',
    desc: 'Talk directly with a specialist',
    detail: 'Wait: ~5 min',
    detailColor: 0xff34a853,
    color: 0xff0d2a1a,
    accentColor: 0xff34a853,
  },
  {
    icon: '💬',
    title: 'Secure Chat',
    desc: 'Message your care team anytime',
    detail: 'Always Available',
    detailColor: 0xff1a73e8,
    color: 0xff1a1a0d,
    accentColor: 0xfffbb12b,
  },
];

// Doctors available for telemedicine (first 4)
const TELE_DOCTORS = DOCTORS.filter(d => d.available).slice(0, 4);

export default class Telemedicine extends Lightning.Component {
  static _template() {
    return {
      w: 1920, h: 1080,
      Sidebar: { type: Sidebar },
      Content: {
        x: 460, y: 0,
        w: 1460, h: 1080,
        rect: true,
        color: 0xff0a0a0a,
        // Page header
        Header: {
          x: 0, y: 0, w: 1460, h: 130,
          rect: true,
          colorTop: 0xff0a2033,
          colorBottom: 0xff0a0a0a,
          Title: {
            x: 40, y: 22,
            text: {
              text: 'Telemedicine',
              fontFace: 'Regular',
              fontSize: 40,
              textColor: 0xffffffff,
              fontStyle: 'bold',
            },
          },
          Subtitle: {
            x: 40, y: 70,
            text: {
              text: 'Virtual care from board-certified physicians — anytime, anywhere',
              fontFace: 'Regular',
              fontSize: 18,
              textColor: 0xff666666,
            },
          },
          HeaderAccent: {
            x: 0, y: 126, w: 1460, h: 4,
            rect: true,
            colorLeft: 0xff1a73e8,
            colorRight: 0xff0a0a0a,
          },
          // Status pill
          StatusPill: {
            x: 1220, y: 30,
            w: 200, h: 32,
            rect: true,
            color: 0xff0d2a1a,
            StatusDot: {
              x: 12, y: 7, w: 10, h: 10, rect: true, color: 0xff34a853,
              shader: { type: Lightning.shaders.RoundedRectangle, radius: 5 },
            },
            StatusText: {
              x: 30, y: 7,
              text: {
                text: 'Doctors Online Now',
                fontFace: 'Regular',
                fontSize: 14,
                textColor: 0xff34a853,
              },
            },
          },
        },
        // Section label: Service types
        ServicesLabel: {
          x: 40, y: 148,
          text: {
            text: 'CHOOSE YOUR CARE TYPE',
            fontFace: 'Regular',
            fontSize: 12,
            textColor: 0xff444444,
          },
        },
        // Service type cards
        Services: {
          x: 40, y: 170,
          children: SERVICE_CARDS.map((s, i) => ({
            ref: `Svc${i}`,
            x: i * (420 + 20),
            w: 420, h: 180,
            rect: true,
            color: s.color,
            // Top accent
            SvcAccent: {
              x: 0, y: 0, w: 420, h: 5,
              rect: true,
              color: s.accentColor,
            },
            SvcIcon: {
              x: 30, y: 30,
              text: { text: s.icon, fontSize: 44, textColor: 0xffffffff },
            },
            SvcTitle: {
              x: 110, y: 34,
              text: {
                text: s.title,
                fontFace: 'Regular',
                fontSize: 26,
                textColor: 0xffffffff,
                fontStyle: 'bold',
              },
            },
            SvcDesc: {
              x: 110, y: 68,
              w: 290,
              text: {
                text: s.desc,
                fontFace: 'Regular',
                fontSize: 16,
                textColor: 0xff888888,
                wordWrapWidth: 290,
                maxLines: 2,
              },
            },
            SvcDetailRow: {
              x: 30, y: 124,
              SvcDetailDot: {
                x: 0, y: 5, w: 8, h: 8, rect: true, color: s.detailColor,
                shader: { type: Lightning.shaders.RoundedRectangle, radius: 4 },
              },
              SvcDetail: {
                x: 16, y: 0,
                text: {
                  text: s.detail,
                  fontFace: 'Regular',
                  fontSize: 15,
                  textColor: s.detailColor,
                },
              },
            },
            // Start button
            SvcBtn: {
              x: 30, y: 136,
              w: 200, h: 34,
              rect: true,
              color: s.accentColor,
              SvcBtnLabel: {
                mount: 0.5, x: 100, y: 17,
                text: {
                  text: 'Start Now  →',
                  fontFace: 'Regular',
                  fontSize: 15,
                  textColor: 0xffffffff,
                },
              },
            },
          })),
        },
        // Divider
        MidDivider: {
          x: 40, y: 366, w: 1380, h: 1,
          rect: true,
          color: 0xff1e1e1e,
        },
        // Available doctors section
        DoctorsLabel: {
          x: 40, y: 378,
          text: {
            text: 'AVAILABLE NOW',
            fontFace: 'Regular',
            fontSize: 12,
            textColor: 0xff444444,
          },
        },
        AvailCount: {
          x: 178, y: 378,
          text: {
            text: `${TELE_DOCTORS.length} doctors ready`,
            fontFace: 'Regular',
            fontSize: 12,
            textColor: 0xff34a853,
          },
        },
        DoctorList: {
          x: 0, y: 402,
          children: TELE_DOCTORS.map((doc, i) => ({
            ref: `TDoc${i}`,
            x: 40,
            y: i * 148,
            w: 1380, h: 136,
            rect: true,
            color: i % 2 === 0 ? 0xff111111 : 0xff0e0e0e,
            // Left avatar
            DocAvatar: {
              x: 20, y: 18,
              w: 80, h: 80,
              rect: true,
              color: doc.avatarColor || 0xff1a73e8,
              shader: { type: Lightning.shaders.RoundedRectangle, radius: 40 },
              DocInitials: {
                mount: 0.5, x: 40, y: 40,
                text: {
                  text: doc.initials || '??',
                  fontFace: 'Regular',
                  fontSize: 28,
                  textColor: 0xffffffff,
                  fontStyle: 'bold',
                },
              },
            },
            // Status dot
            DocStatus: {
              x: 84, y: 86, w: 14, h: 14, rect: true, color: 0xff34a853,
              shader: { type: Lightning.shaders.RoundedRectangle, radius: 7 },
            },
            // Info
            DocName: {
              x: 124, y: 22,
              text: {
                text: doc.name || '',
                fontFace: 'Regular',
                fontSize: 22,
                textColor: 0xffffffff,
                fontStyle: 'bold',
              },
            },
            DocSpecialty: {
              x: 124, y: 52,
              text: {
                text: doc.specialty || '',
                fontFace: 'Regular',
                fontSize: 16,
                textColor: 0xff1a73e8,
              },
            },
            DocMeta: {
              x: 124, y: 78,
              text: {
                text: `★ ${doc.rating}  ·  ${doc.years}  ·  Available Now`,
                fontFace: 'Regular',
                fontSize: 14,
                textColor: 0xff666666,
              },
            },
            // Action buttons
            DocVideoBtn: {
              x: 1070, y: 38,
              w: 130, h: 36,
              rect: true,
              color: 0xff1a73e8,
              BtnLabel: {
                mount: 0.5, x: 65, y: 18,
                text: { text: '▶  Video', fontFace: 'Regular', fontSize: 14, textColor: 0xffffffff },
              },
            },
            DocChatBtn: {
              x: 1216, y: 38,
              w: 130, h: 36,
              rect: true,
              color: 0xff1e1e1e,
              ChatBtnLabel: {
                mount: 0.5, x: 65, y: 18,
                text: { text: '💬  Chat', fontFace: 'Regular', fontSize: 14, textColor: 0xffaaaaaa },
              },
            },
            // Divider
            DocDivider: {
              x: 0, y: 135, w: 1380, h: 1,
              rect: true, color: 0xff1a1a1a,
            },
          })),
        },
        // "How it works" section at bottom
        HowItWorks: {
          x: 40, y: 1000,
          text: {
            text: 'How it works:  1. Choose care type  →  2. Select a doctor  →  3. Start your consultation',
            fontFace: 'Regular',
            fontSize: 15,
            textColor: 0xff444444,
          },
        },
      },
    };
  }

  _init() {
    this._sidebarFocused = true;
  }

  _getFocused() {
    if (this._sidebarFocused) return this.tag('Sidebar');
    return this.tag('Sidebar'); // content non-interactive for now
  }

  $focusContent() {
    this._sidebarFocused = false;
    this._refocus();
  }

  $focusSidebar() {
    this._sidebarFocused = true;
    this._refocus();
  }
}
