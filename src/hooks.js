import { useState, useEffect } from 'haunted';

export const useToggleDelay = (delay = 2000, initial = false) => {
  const [value, setValue] = useState(initial);

  function toggle() {
    if (value) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => setValue(false), delay);
    }
  }

  useEffect(toggle, [value]);

  return [value, setValue, toggle];
};
