import { html, useEffect, useState, useCallback } from 'haunted';
import '../custom-elements/toast-container';
import styles from './ToastConsole.scss';
import { properties as commonProperties } from './ToastProps';
import { useResetBooleanTimeout } from '../hooks';

const properties = {
  ...commonProperties,
  methods: { type: Array },
  noConsole: { type: Boolean, attribute: 'no-console' },
};

function format(...args) {
  return args
    .map((param = '') => {
      if (typeof param === 'object') {
        try {
          return JSON.stringify(param);
        } catch (e) {}
      }

      return param;
    })
    .join(' ‣ ');
}

function ToastConsole({
  duration = 2000,
  methods = ['log', 'info', 'warn', 'error'],
  noConsole = false,
  closeOnClick = false,
}) {
  const [type, setType] = useState('log');
  const [message, setMessage] = useState('');
  const opened = useResetBooleanTimeout(duration);
  const originalMethods = new Map();
  const consoleEnabled = !noConsole;
  const onClick = useCallback(() => {
    if (closeOnClick) {
      opened.setValue(false);
    }
  });

  useEffect(() => {
    methods.forEach((method) => {
      originalMethods.set(method, console[method]);

      console[method] = function (...args) {
        setType(method);
        setMessage(() => format(...args));
        opened.setValue(true);
        opened.reset.call(this);

        consoleEnabled && originalMethods.get(method).call(this, ...args);
      };
    });

    return () => {
      methods.forEach((method) => {
        console[method] = originalMethods.get(method);
      });
    };
  }, [type, message, opened]);

  return html`
    <toast-container .opened=${opened.value}>
      <p class="logger ${type}" @click=${onClick}>${message}</p>
    </toast-container>
  `;
}

export { ToastConsole, styles, properties };
