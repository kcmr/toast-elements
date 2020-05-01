import { useState } from 'haunted';

export const useResetBooleanTimeout = (delay = 2000) => {
  const [value, setValue] = useState(false);

  function reset() {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => setValue(false), delay);
  }

  return {
    value,
    setValue,
    reset,
  };
};
