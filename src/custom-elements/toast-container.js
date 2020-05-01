import { defineCustomElement } from '../utils';
import { ToastContainer, styles, properties } from '../components/ToastContainer';

defineCustomElement('toast-container', ToastContainer, {
  styles,
  properties,
});
