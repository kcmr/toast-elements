import { html, useEffect, useState, useCallback } from 'haunted';
import '../custom-elements/toast-container';
import { useResetBooleanTimeout } from '../hooks';
import { properties as commonProperties } from './ToastProps';
import styles from './ToastEvent.scss';

const properties = {
  ...commonProperties,
  events: { type: Array },
};

function ToastEvent({ events = [], duration = 4000, closeOnClick = false }) {
  const [type, setType] = useState();
  const [bubbles, setBubbles] = useState();
  const [detail, setDetail] = useState();
  const opened = useResetBooleanTimeout(duration);
  const onClick = useCallback(() => {
    if (closeOnClick) {
      opened.setValue(false);
    }
  });

  function onEventCaptured(event) {
    setType(event.type);
    setBubbles(String(event.bubbles));
    setDetail(event.detail);
    opened.setValue(true);
    opened.reset();
  }

  useEffect(() => {
    events.forEach((event) => {
      document.addEventListener(event, onEventCaptured, true);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, onEventCaptured, true);
      });
    };
  }, [setType, setDetail, setBubbles]);

  return html`
    <toast-container .opened=${opened.value}>
      <div class="content" @click=${onClick}>
        <div>type: <code>${type}</code></div>
        <div>bubbles: <code>${bubbles}</code></div>
        <div>${detail ? html`detail: <code>${JSON.stringify(detail, null, 2)}</code>` : ''}</div>
      </div>
    </toast-container>
  `;
}

export { ToastEvent, styles, properties };
