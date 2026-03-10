import { Lightning } from '@lightningjs/sdk';
import ContentCard from './ContentCard.js';

const CARD_W   = 260;
const CARD_GAP = 16;
const CARD_STEP = CARD_W + CARD_GAP;
const VISIBLE_CARDS = 4; // cards visible before we start scrolling

// Row total height = label (30) + gap (10) + card (185) = 225
export default class ContentRow extends Lightning.Component {
  static _template() {
    return {
      w: 1380,
      h: 225,
      Label: {
        x: 0, y: 0,
        text: {
          text: '',
          fontFace: 'Regular',
          fontSize: 24,
          textColor: 0xffffffff,
          fontStyle: 'bold',
        },
      },
      // "See All" hint
      SeeAll: {
        x: 0, y: 2,
        text: {
          text: 'See All  ›',
          fontFace: 'Regular',
          fontSize: 18,
          textColor: 0xff1a73e8,
        },
      },
      // Clipping wrapper so cards don't overflow
      Clip: {
        x: 0, y: 40,
        w: 1380,
        h: 185,
        clipping: true,
        Items: {
          x: 0, y: 0,
          // children added dynamically
        },
      },
    };
  }

  _init() {
    this._focusIndex = 0;
    // Set up smooth scroll transition
    this.tag('Clip.Items').transition('x').settings = {
      duration: 0.35,
      timingFunction: 'ease-out',
    };
  }

  set rowData(data) {
    this._data = data;
    this._renderRow();
  }

  _renderRow() {
    if (!this._data) return;

    // Update label
    this.tag('Label').patch({ text: { text: this._data.label || '' } });

    // Position "See All" to the right of the label text
    // Approximate: label character count * ~14px
    const labelW = (this._data.label || '').length * 14 + 20;
    this.tag('SeeAll').patch({ x: labelW });

    // Build card children
    const children = (this._data.items || []).map((item, i) => ({
      ref: `Card${i}`,
      type: ContentCard,
      x: i * CARD_STEP,
      y: 0,
      item,
    }));

    this.tag('Clip.Items').patch({ children });
    this._focusIndex = 0;
  }

  _getFocused() {
    const items = this.tag('Clip.Items');
    return items && items.children[this._focusIndex];
  }

  _handleRight() {
    const total = (this._data && this._data.items) ? this._data.items.length : 0;
    if (this._focusIndex < total - 1) {
      this._focusIndex++;
      this._scrollItems();
    }
  }

  _handleLeft() {
    if (this._focusIndex > 0) {
      this._focusIndex--;
      this._scrollItems();
    } else {
      // Signal parent to return to sidebar
      this.fireAncestors('$focusSidebar');
    }
  }

  _scrollItems() {
    // Start scrolling after VISIBLE_CARDS cards
    const scrollStart = VISIBLE_CARDS - 1;
    const targetX = this._focusIndex > scrollStart
      ? -((this._focusIndex - scrollStart) * CARD_STEP)
      : 0;
    this.tag('Clip.Items').setSmooth('x', targetX);
  }

  // Reset scroll when row gains focus from parent
  resetFocus() {
    this._focusIndex = 0;
    this.tag('Clip.Items').setSmooth('x', 0);
  }
}
