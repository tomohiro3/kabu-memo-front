// memo
// - safariではinputタグ以外のtabbaleなエレメントにフォーカスが当たらない。
// - 作成したカスタムエレメントクラスのインスタンスが正しく登録されるために
//   名前付きクラスを定義してからdefineするようにする（ワンライナーでdefineしない）

// TODO
// - スクロールチェーン解消
// - 下記ファイルをwebpackでロードする
// - lit-elementの導入
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';
import 'construct-style-sheets-polyfill/dist/adoptedStyleSheets.js';
import { FOCUSABLE_ELEMENTS } from '../../constants/dom';
import { BREAK_POINT } from '../../constants/style';

const styleText = `
@-webkit-keyframes MediaDialog-toggle {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes MediaDialog-toggle {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.ModalDialog {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  text-align: left;
}
.ModalDialog-opened {
  display: flex;
  -webkit-animation: MediaDialog-toggle 0.2s ease;
  animation: MediaDialog-toggle 0.2s ease;
}
.ModalDialog_backdrop {
  display: block;
  z-index: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.ModalDialog_content {
  z-index: 1;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  cursor: auto;
  position: relative;
  box-sizing: border-box;
  max-width: 80%;
  min-width: 495px;
  height: auto;
  padding: 24px;
}
@media screen and (max-width: ${BREAK_POINT.medium}px) {
  .ModalDialog_content {
    width: 94%;
    max-width: 94%;
    min-width: 240px;
    padding: 16px;
  }
}
.ModalDialog_closeButton {
  height: 24px;
  width: 24px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 512 512%27 width=%2724%27 height=%2724%27><path fill=%27%23333%27 d=%27M322.7,256l100.1-100.1c12.3-12.3,12.3-32.2,0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5,0L256,189.3L155.9,89.2 c-12.3-12.3-32.2-12.3-44.5,0l-22.2,22.2c-12.3,12.3-12.3,32.2,0,44.5L189.3,256L89.2,356.1c-12.3,12.3-12.3,32.2,0,44.5l22.2,22.2 c12.3,12.3,32.2,12.3,44.5,0L256,322.7l100.1,100.1c12.3,12.3,32.2,12.3,44.5,0l22.2-22.2c12.3-12.3,12.3-32.2,0-44.5L322.7,256z%27/></svg>");
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}
@media screen and (max-width: ${BREAK_POINT.medium}px) {
  .ModalDialog_closeButton {
    top: 13px;
    right: 13px;
  }
}
.ModalDialog_closeButton:hover {
  opacity: 0.8;
}
.ModalDialog_title {  
  margin: 0;
  padding: 0 24px 16px 0;
  font-size: 18px;
  border-bottom: 1px solid #eee;
}
.ModalDialog_body {
  padding: 16px 0 0;
  overflow: auto;
  max-height: 70vh;
}
.ModalDialog_body p:not(:first-child) {
  margin-top: 0.8em;
}
`;

export class MyModal extends HTMLElement {
  static get observedAttributes() {
    return ['aria-label', 'opened'];
  }

  private _focusedLightDOMEl: HTMLElement | null = null;
  private _focusableEls: HTMLElement[];
  private _stylesheet: CSSStyleSheet;

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    this._stylesheet = new CSSStyleSheet();
    shadow.adoptedStyleSheets = [this._stylesheet];

    // memo
    // connectedCallback()でshadowDOMを作成すると、opened属性があらかじめ付与されている場合に、
    // shadowDOMの作成が完了する前にattributeChangedCallback()が実行されてしまい
    // モーダルコンテンツが表示されなくなってしまうのでconstructorでshadowDOMを作成する
    this._render(shadow);

    this._focusableEls = [shadow.querySelector('.ModalDialog_closeButton')] as HTMLElement[];
  }

  connectedCallback() {
    // MEMO
    // jest環境だとconstruct-style-sheets-polyfillで定義されたinterface CSSStyleSheetしか読み込まれず、stylesheet.cssRules でエラーが起きるためNODE_ENVで回避
    // おそらくjest-domが正しくdefinitionを読み込めていない
    if (process.env.NODE_ENV === 'test') {
      this._stylesheet.replace(styleText);
    } else {
      if (!this._stylesheet.cssRules.length) {
        this._stylesheet.replace(styleText);
      }
    }

    // memo
    // construcotrで属性は設定できない
    this.setAttribute('role', 'dialog');
    this.setAttribute('aria-modal', 'true');

    this._attachEventHandler();
  }

  attributeChangedCallback(name: 'aria-label' | 'opened', _prevValue: string | null, nextValue: string | null) {
    if (name === 'aria-label' && this.shadowRoot?.querySelector('.ModalDialog_title')) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.shadowRoot.querySelector('.ModalDialog_title')!.textContent = nextValue;
    }

    if (name === 'opened' && this.shadowRoot?.querySelector('.ModalDialog')) {
      if (nextValue === null) {
        if (this.getAttribute('static') === null) {
          this.innerHTML = '';
        }
        this.shadowRoot.querySelector('.ModalDialog')?.classList.remove('ModalDialog-opened');
        this._focusedLightDOMEl && this._focusedLightDOMEl.focus();
        this._focusableEls = [this.shadowRoot?.querySelector('.ModalDialog_closeButton')] as HTMLElement[];
      } else {
        this.shadowRoot.querySelector('.ModalDialog')?.classList.add('ModalDialog-opened');
        this._focusedLightDOMEl = document.activeElement as HTMLElement;
        this._focusableEls[0].focus();
      }
    }
  }

  // memo
  // shadowDOMにアタッチされたイベントはdisconnectするとGCされる
  private _attachEventHandler() {
    if (!this.shadowRoot) {
      return;
    }
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    this.shadowRoot.querySelector('.ModalDialog_backdrop')!.addEventListener('click', () => {
      this._closeModal();
    });
    this.shadowRoot.querySelector('.ModalDialog_closeButton')!.addEventListener('click', () => {
      this._closeModal();
    });
    this.shadowRoot.querySelector('.ModalDialog_closeButton')!.addEventListener('keydown', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') {
        e.preventDefault();
        this._closeModal();
      }
    });
    this.shadowRoot.querySelector('slot')!.addEventListener('slotchange', () => {
      if (this.shadowRoot?.querySelector('slot')?.assignedElements().length) {
        this._focusableEls = [
          ...this._focusableEls,
          ...(this.querySelectorAll(FOCUSABLE_ELEMENTS.join(',')) as unknown as HTMLElement[]),
        ] as HTMLElement[];
      }
    });
    this.shadowRoot.addEventListener('keydown', (e) => {
      switch ((e as KeyboardEvent).key) {
        case 'Escape':
          e.preventDefault();
          this._closeModal();
          break;
        case 'Tab':
          this._trapFocus(e as KeyboardEvent);
          break;
        default:
          break;
      }
    });
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
  private _closeModal() {
    this.removeAttribute('opened');
  }
  private _trapFocus(e: KeyboardEvent) {
    const firstFocusableEl = this._focusableEls[0];
    const lastFocusableEl = this._focusableEls[this._focusableEls.length - 1];

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    if ((e as KeyboardEvent).shiftKey) {
      // modal内の一番最初のtabbableなエレメントはshadowRootにある閉じるボタン
      if (this.shadowRoot!.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      // modal内のlightDOMにtabbableなエレメントがある場合はその一番最後のエレメントがactiveになり、ない場合はshadowRootの閉じるボタンがactiveになる
      if (document.activeElement === lastFocusableEl || this.shadowRoot!.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
  }
  private _render(shadow: ShadowRoot) {
    shadow.innerHTML = `
      <div class="ModalDialog">
          <div class="ModalDialog_backdrop"></div>
          <div class="ModalDialog_content">
              <div class="ModalDialog_closeButton" role="button" aria-label="閉じる" tabindex="0"></div>
              <h2 id="modal-head" class="ModalDialog_title"></h2>
              <div class="ModalDialog_body">
                  <slot></slot>
              </div>
          </div>
      </div>
    `;
  }
}

customElements.define('my-modal', MyModal);
