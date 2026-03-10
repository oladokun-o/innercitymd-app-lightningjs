import { Lightning } from '@lightningjs/sdk';
import Sidebar from '../components/Sidebar.js';
import HeroBanner from '../components/HeroBanner.js';
import ContentRow from '../components/ContentRow.js';
import { FEATURED, HOME_ROWS } from '../data/content.js';

const ROW_H    = 225; // height of each content row
const ROWS_Y   = 400; // y position where rows start (below hero)
const VISIBLE_H = 680; // 1080 - ROWS_Y = available height for rows

export default class Home extends Lightning.Component {
  static _template() {
    return {
      w: 1920, h: 1080,
      Sidebar: { type: Sidebar },
      Content: {
        x: 460, y: 0,
        w: 1460, h: 1080,
        rect: true,
        color: 0xff0a0a0a,
        Hero: {
          x: 0, y: 0,
          type: HeroBanner,
        },
        // "Now Playing" label above rows
        RowsHeader: {
          x: 40, y: ROWS_Y - 26,
          text: {
            text: '',
            fontFace: 'Regular',
            fontSize: 14,
            textColor: 0xff444444,
          },
        },
        // Rows clipping container
        RowsClip: {
          x: 0, y: ROWS_Y,
          w: 1460, h: VISIBLE_H,
          clipping: true,
          Scroller: {
            x: 40, y: 0,
            w: 1380, h: HOME_ROWS.length * ROW_H,
            children: HOME_ROWS.map((row, i) => ({
              ref: `Row${i}`,
              type: ContentRow,
              x: 0,
              y: i * ROW_H,
              rowData: row,
            })),
          },
        },
      },
    };
  }

  _init() {
    this._sidebarFocused = true;
    this._rowIndex = 0;

    // Set hero data
    this.tag('Content.Hero').data = FEATURED;

    // Set up scroll transition
    this.tag('Content.RowsClip.Scroller').transition('y').settings = {
      duration: 0.35,
      timingFunction: 'ease-out',
    };
  }

  _getFocused() {
    if (this._sidebarFocused) return this.tag('Sidebar');
    return this._currentRow();
  }

  _currentRow() {
    return this.tag('Content.RowsClip.Scroller').children[this._rowIndex];
  }

  $focusContent() {
    this._sidebarFocused = false;
    this._rowIndex = 0;
    this._refocus();
  }

  $focusSidebar() {
    this._sidebarFocused = true;
    this._refocus();
  }

  _handleDown() {
    if (this._sidebarFocused) return;
    if (this._rowIndex < HOME_ROWS.length - 1) {
      this._rowIndex++;
      this._scrollToRow();
      this._refocus();
    }
  }

  _handleUp() {
    if (this._sidebarFocused) return;
    if (this._rowIndex > 0) {
      this._rowIndex--;
      this._scrollToRow();
      this._refocus();
    }
  }

  _scrollToRow() {
    // Keep focused row near the top of the visible area
    const targetY = -Math.max(0, (this._rowIndex - 0) * ROW_H);
    // Clamp so we don't over-scroll
    const minY = -(HOME_ROWS.length * ROW_H - VISIBLE_H);
    const clampedY = Math.max(minY, Math.min(0, targetY));
    this.tag('Content.RowsClip.Scroller').setSmooth('y', clampedY);
  }
}
