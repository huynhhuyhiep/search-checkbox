import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = (effect, delay, deps) => {
  const callback = useCallback(effect, deps);
  const timeoutId = useRef();

  useEffect(() => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(callback, delay);

    return () => clearTimeout(timeoutId.current);
  }, [callback, delay]);
};
