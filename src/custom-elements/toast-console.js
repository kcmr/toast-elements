import { defineCustomElement } from '../utils';
import { ToastConsole, styles, properties } from '../components/ToastConsole';

defineCustomElement('toast-console', ToastConsole, {
  styles,
  properties,
});
