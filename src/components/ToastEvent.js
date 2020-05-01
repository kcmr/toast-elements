import { html, useEffect, useState } from 'haunted';
import '../custom-elements/toast-container';

const properties = {
  events: { type: Array },
  duration: { type: Number },
};

function ToastEvent({ events = [], duration = 2000 }) {
  const [type, setType] = useState();
  const [bubbles, setBubbles] = useState();
  const [detail, setDetail] = useState();
  const [opened, setOpened] = useState(false);

  function onEventCaptured(event) {
    setOpened(true);
    setType(event.type);
    setBubbles(String(event.bubbles));
    setDetail(event.detail);
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => setOpened(false), duration);
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
    <toast-container .opened=${opened}>
      <div>Type: ${type}</div>
      <div>Bubbles: ${bubbles}</div>
      <div>${detail ? `Detail: ${JSON.stringify(detail, null, 2)}` : ''}</div>
    </toast-container>
  `;
}

export { ToastEvent, properties };
