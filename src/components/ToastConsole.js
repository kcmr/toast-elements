import { useState, useEffect, html } from 'haunted';
import styles from './ToastConsole.scss';

const properties = {
  duration: { type: Number },
  methods: { type: Array },
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
    .join('<br />');
}

function ToastConsole({ duration = 2000, methods = ['log', 'info', 'warn', 'error'] }) {
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState('log');
  const [message, setMessage] = useState('');
  const originalMethods = new Map();

  useEffect(() => {
    methods.forEach((method) => {
      originalMethods.set(method, console[method]);

      console[method] = function (...args) {
        setType(method);
        setOpened(true);
        setMessage(() => format(...args));
        this.timeout && clearTimeout(this.timeout);
        this.timeout = setTimeout(() => setOpened(false), duration);
      };
    });

    return () => {
      methods.forEach((method) => {
        console[method] = originalMethods.get(method);
      });
    };
  });

  return html`
    <div class="logger ${type} opened-${opened}">
      <p .innerHTML=${message}></p>
    </div>
  `;
}

export { ToastConsole, styles, properties };
