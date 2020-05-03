import { component } from 'haunted-lit-element';
import { css, unsafeCSS } from 'lit-element';

const getStyle = (style) =>
  css`
    ${unsafeCSS(style)}
  `;

export const defineCustomElement = (name, renderer, { styles, properties = {} } = {}) => {
  if (!customElements.get(name)) {
    customElements.define(
      name,
      component(renderer, {
        styles: getStyle(styles),
        properties,
      }),
    );
  }
};
