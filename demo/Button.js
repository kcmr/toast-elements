import { css, html, LitElement } from 'lit-element';
const styles = css`
  but-on {
    display: inline-block;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    color: #828282;
  }

  button {
    display: block;
    width: 100%;
    font: inherit;
    text-decoration: inherit;
    color: inherit;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
  }

  button::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  button:disabled {
    cursor: default;
    pointer-events: none;
  }

  button:focus > span {
    box-shadow: var(--but-on-focus-box-shadow, 0 0 0 2px rgb(35, 189, 234));
  }

  button:active > span {
    background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
    top: 1px;
  }

  button > span {
    position: relative;
    display: block;
    line-height: 40px;
    padding: 0 15px 2px;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.1);
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    border-radius: 4px;
    position: relative;
    background-color: var(--but-on-bg, #f0f0f0);
  }

  button:focus,
  button > span:focus {
    outline: none;
  }
`;

class ButtonElement extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      text: { type: String },
    };
  }

  createRenderRoot() {
    return this;
  }

  constructor() {
    super();
    this.type = 'button';
  }

  render() {
    return html`
      <style>
        ${styles}
      </style>
      <button tabindex="0" autocomplete="off" type=${this.type}>
        <span tabindex="-1">${this.text}</span>
      </button>
    `;
  }
}

customElements.define('but-on', ButtonElement);
