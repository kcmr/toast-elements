import { html, useEffect, useState } from 'haunted';
import '../custom-elements/toast-container';
import styles from './ToastConsole.scss';

const properties = {
  duration: { type: Number },
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
}) {
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState('log');
  const [message, setMessage] = useState('');
  const originalMethods = new Map();
  const consoleEnabled = !noConsole;

  useEffect(() => {
    methods.forEach((method) => {
      originalMethods.set(method, console[method]);

      console[method] = function (...args) {
        setType(method);
        setOpened(true);
        setMessage(() => format(...args));
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => setOpened(false), duration);

        consoleEnabled && originalMethods.get(method).call(this, ...args);
      };
    });

    return () => {
      methods.forEach((method) => {
        console[method] = originalMethods.get(method);
      });
    };
  }, [setType, setOpened, setMessage]);

  return html`
    <toast-container .opened=${opened}>
      <p class="logger ${type}">${message}</p>
    </toast-container>
  `;
}

export { ToastConsole, styles, properties };
