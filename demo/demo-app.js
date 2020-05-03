import { useCallback, html } from 'haunted';
import styles from './demo-app.css';
import { defineCustomElement } from '../src/utils';
import './Button';

function DemoApp() {
  const log = (m) => useCallback(() => console.log(m, { foo: 'bar' }));
  const warn = (m) => useCallback(() => console.warn(m, 'another'));
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
      <but-on class="green" @click=${log('hello world!')} text="console.log">console.log</but-on>
      <but-on class="orange" @click=${warn('a warning message')} text="console.warn"></but-on>
      <but-on
        class="blue"
        @click=${info('this is an informative message')}
        text="console.info"
      ></but-on>
      <but-on class="red" @click=${error('something goes wrong :(')} text="console.error"></but-on>
    </div>
    <div class="buttons">
      <but-on @click=${fireEvent('event-one')} text="event-one"></but-on>
      <but-on @click=${fireEvent('event-two', { foo: 'bar' }, true)} text="event-two"></but-on>
    </div>
  `;
}

defineCustomElement('demo-app', DemoApp, {
  styles,
});
