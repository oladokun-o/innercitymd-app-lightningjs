import { Lightning } from '@lightningjs/sdk';
import Sidebar from '../components/Sidebar.js';
import ContentRow from '../components/ContentRow.js';
import { ONDEMAND_ROWS } from '../data/content.js';

const ROW_H    = 225;
const ROWS_Y   = 120;
const VISIBLE_H = 1080 - ROWS_Y;

export default class Ondemand extends Lightning.Component {
  static _template() {
    return {
      w: 1920, h: 1080,
      Sidebar: { type: Sidebar },
      Content: {
        x: 460, y: 0,
        w: 1460, h: 1080,
        rect: true,
        color: 0xff0a0a0a,
        // Header
        Header: {
          x: 0, y: 0, w: 1460, h: 110,
          rect: true,
          colorTop: 0xff0a1a2e,
          colorBottom: 0xff0a0a0a,
          Title: {
            x: 40, y: 20,
            text: {
              text: 'On Demand',
              fontFace: 'Regular',
              fontSize: 40,
              textColor: 0xffffffff,
              fontStyle: 'bold',
            },
          },
          Subtitle: {
            x: 40, y: 66,
            text: {
              text: `${ONDEMAND_ROWS.reduce((acc, r) => acc + r.items.length, 0)} videos across ${ONDEMAND_ROWS.length} categories`,
              fontFace: 'Regular',
              fontSize: 17,
              textColor: 0xff555555,
            },
          },
          HeaderAccent: {
            x: 0, y: 106, w: 1460, h: 4,
            rect: true,
            colorLeft: 0xff1a73e8,
            colorRight: 0xff0a0a0a,
          },
        },
        // Rows
        RowsClip: {
          x: 0, y: ROWS_Y,
          w: 1460, h: VISIBLE_H,
          clipping: true,
          Scroller: {
            x: 40, y: 0,
            w: 1380,
            children: ONDEMAND_ROWS.map((row, i) => ({
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
    if (this._rowIndex < ONDEMAND_ROWS.length - 1) {
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
    const targetY = -Math.max(0, this._rowIndex * ROW_H);
    const minY = -(ONDEMAND_ROWS.length * ROW_H - VISIBLE_H);
    this.tag('Content.RowsClip.Scroller').setSmooth('y', Math.max(minY, targetY));
  }
}
