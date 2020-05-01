import { useState, useEffect, html } from 'haunted';
import '../custom-elements/toast-container';

const properties = {
  events: { type: Array },
};

function ToastEvent({ events = [] }) {
  const [type, setType] = useState();
  const [bubbles, setBubbles] = useState();
  const [detail, setDetail] = useState();

  const onEventCaptured = (event) => {
    setType(event.type);
    setBubbles(String(event.bubbles));
    setDetail(event.detail);
  };

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
    <toast-container .opened=${Boolean(type)}>
      <div>Type: ${type}</div>
      <div>Bubbles: ${bubbles}</div>
      <div>${detail ? `Detail: ${JSON.stringify(detail, null, 2)}` : ''}</div>
    </toast-container>
  `;
}

export { ToastEvent, properties };
