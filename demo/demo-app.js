import { useCallback, html } from 'haunted';
import { component } from 'haunted-lit-element';

function DemoApp() {
  const log = (m) => useCallback(() => console.log(m));
  const warn = (m) => useCallback(() => console.warn(m));
  const info = (m) => useCallback(() => console.info(m));
  const error = (m) => useCallback(() => console.error(m));

  const fireEvent = (name, detail, bubbles = false) =>
    useCallback(({ target }) => {
      target.dispatchEvent(
        new CustomEvent(name, {
          composed: true,
          bubbles,
          detail,
        }),
      );
    });

  return html`
    <div class="buttons">
      <button @click=${log('hello world!')}>console.log</button>
      <button @click=${warn('a warning message')}>console.warn</button>
      <button @click=${info('this is an informative message')}>console.info</button>
      <button @click=${error('something goes wrong :(')}>console.error</button>
    </div>
    <div class="buttons">
      <button @click=${fireEvent('event-one')}>event-one</button>
      <button @click=${fireEvent('event-two', { foo: 'bar' }, true)}>event-two</button>
    </div>
  `;
}

customElements.define('demo-app', component(DemoApp));
