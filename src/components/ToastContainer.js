import { html } from 'haunted';
import styles from './ToastContainer.scss';

const properties = {
  opened: { type: Boolean },
};

function ToastContainer({ opened = false }) {
  return html`
    <div class="toast opened-${opened}">
      <slot></slot>
    </div>
  `;
}

export { ToastContainer, styles, properties };
