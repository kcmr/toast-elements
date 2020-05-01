import { useCallback, html } from 'haunted';
import { component } from 'haunted-lit-element';

function DemoApp() {
  const log = (m) => useCallback(() => console.log(m));
  const warn = (m) => useCallback(() => console.warn(m));
  const info = (m) => useCallback(() => console.info(m));
  const error = (m) => useCallback(() => console.error(m));

  return html` <div class="buttons">
    <button @click=${log('hello world!')}>console.log</button>
    <button @click=${warn('a warning message')}>console.warn</button>
    <button @click=${info('this is an informative message')}>console.info</button>
    <button @click=${error('something goes wrong :(')}>console.error</button>
  </div>`;
}

customElements.define('demo-app', component(DemoApp));
