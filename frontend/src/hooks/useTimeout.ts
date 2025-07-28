import { useEffect, useRef } from 'react';

// creating the custom useTimeout hook
const useTimeout = (callback: () => void, delay: number | undefined) => {
  // Creating a ref
  const savedCallback = useRef(callback);

  // To remember the latest callback .
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Setting and clearing up a timeout
  useEffect(() => {
    const func = () => {
      savedCallback.current();
    };
    if (delay !== undefined) {
      const id = setTimeout(func, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
};

export default useTimeout;
