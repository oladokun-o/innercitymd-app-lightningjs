import { Lightning } from '@lightningjs/sdk';
import Sidebar from '../components/Sidebar.js';
import DoctorCard from '../components/DoctorCard.js';
import { DOCTORS } from '../data/content.js';

const COLS     = 4;
const CARD_W   = 310;
const CARD_H   = 340;
const COL_GAP  = 26;
const ROW_GAP  = 30;
const GRID_X   = 40;
const GRID_Y   = 130; // below page title

export default class Doctors extends Lightning.Component {
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
        PageHeader: {
          x: 0, y: 0, w: 1460, h: 116,
          rect: true,
          colorTop: 0xff0d1f3a,
          colorBottom: 0xff0a0a0a,
          Title: {
            x: 40, y: 28,
            text: {
              text: 'Our Medical Team',
              fontFace: 'Regular',
              fontSize: 42,
              textColor: 0xffffffff,
              fontStyle: 'bold',
            },
          },
          Subtitle: {
            x: 40, y: 76,
            text: {
              text: `${DOCTORS.length} specialists available · Board-certified physicians`,
              fontFace: 'Regular',
              fontSize: 18,
              textColor: 0xff666666,
            },
          },
          // Accent bar at bottom of header
          HeaderAccent: {
            x: 0, y: 112, w: 1460, h: 4,
            rect: true,
            colorLeft: 0xff1a73e8,
            colorRight: 0xff0a0a0a,
          },
        },
        // Filter tabs (visual only, non-interactive for now)
        FilterRow: {
          x: 40, y: 90,
          children: ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Psychiatry'].map((label, i) => ({
            ref: `Filter${i}`,
            x: i * 152,
            w: 142, h: 28,
            rect: true,
            color: i === 0 ? 0xff1a73e8 : 0xff1e1e1e,
            FilterLabel: {
              mount: 0.5, x: 71, y: 14,
              text: {
                text: label,
                fontFace: 'Regular',
                fontSize: 14,
                textColor: i === 0 ? 0xffffffff : 0xff888888,
              },
            },
          })),
        },
        // Doctor grid (clipped for scroll)
        GridClip: {
          x: 0, y: GRID_Y,
          w: 1460, h: 1080 - GRID_Y,
          clipping: true,
          Grid: {
            x: GRID_X, y: 0,
            children: DOCTORS.map((doc, i) => ({
              ref: `Doc${i}`,
              type: DoctorCard,
              x: (i % COLS) * (CARD_W + COL_GAP),
              y: Math.floor(i / COLS) * (CARD_H + ROW_GAP),
              doctor: doc,
            })),
          },
        },
      },
    };
  }

  _init() {
    this._sidebarFocused = true;
    this._focusIndex = 0;

    this.tag('Content.GridClip.Grid').transition('y').settings = {
      duration: 0.35,
      timingFunction: 'ease-out',
    };
  }

  _getFocused() {
    if (this._sidebarFocused) return this.tag('Sidebar');
    return this._focusedCard();
  }

  _focusedCard() {
    return this.tag('Content.GridClip.Grid').children[this._focusIndex];
  }

  $focusContent() {
    this._sidebarFocused = false;
    this._focusIndex = 0;
    this._refocus();
  }

  $focusSidebar() {
    this._sidebarFocused = true;
    this._refocus();
  }

  _handleRight() {
    if (this._sidebarFocused) return;
    const col = this._focusIndex % COLS;
    if (col < COLS - 1 && this._focusIndex < DOCTORS.length - 1) {
      this._focusIndex++;
      this._refocus();
    }
  }

  _handleLeft() {
    if (this._sidebarFocused) return;
    const col = this._focusIndex % COLS;
    if (col > 0) {
      this._focusIndex--;
      this._refocus();
    } else {
      this.$focusSidebar();
    }
  }

  _handleDown() {
    if (this._sidebarFocused) return;
    const next = this._focusIndex + COLS;
    if (next < DOCTORS.length) {
      this._focusIndex = next;
      this._scrollGrid();
      this._refocus();
    }
  }

  _handleUp() {
    if (this._sidebarFocused) return;
    const prev = this._focusIndex - COLS;
    if (prev >= 0) {
      this._focusIndex = prev;
      this._scrollGrid();
      this._refocus();
    }
  }

  _scrollGrid() {
    const row = Math.floor(this._focusIndex / COLS);
    const visibleRows = 2;
    const scrollRow = Math.max(0, row - visibleRows + 1);
    const targetY = -(scrollRow * (CARD_H + ROW_GAP));
    this.tag('Content.GridClip.Grid').setSmooth('y', targetY);
  }
}
