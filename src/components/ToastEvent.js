import { html, useEffect, useState } from 'haunted';
import '../custom-elements/toast-container';
import { useResetBooleanTimeout } from '../hooks';
import styles from './ToastEvent.scss';

const properties = {
  events: { type: Array },
  duration: { type: Number },
};

function ToastEvent({ events = [], duration = 4000 }) {
  const [type, setType] = useState();
  const [bubbles, setBubbles] = useState();
  const [detail, setDetail] = useState();
  const opened = useResetBooleanTimeout(duration);

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
      <div class="content">
        <div>type: <code>${type}</code></div>
        <div>bubbles: <code>${bubbles}</code></div>
        <div>${detail ? html`detail: <code>${JSON.stringify(detail, null, 2)}</code>` : ''}</div>
      </div>
    </toast-container>
  `;
}

export { ToastEvent, styles, properties };
