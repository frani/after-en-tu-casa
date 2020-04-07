import { useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';

export default function useIsUserActive() {
  const [isUserActive, setIsUserActive] = useState(true);
  const timeoutIDRef = useRef(0);
  const isHookMounted = useRef(true);

  useEffect(() => {
    const handleUserActivity = throttle(() => {
      if (isHookMounted.current) {
        setIsUserActive(true);
        clearTimeout(timeoutIDRef.current);
        const timeoutID = window.setTimeout(() => setIsUserActive(false), 5000);
        timeoutIDRef.current = timeoutID;
      }
    }, 500);

    handleUserActivity();

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      clearTimeout(timeoutIDRef.current);
      isHookMounted.current = false;
    };
  }, []);

  return isUserActive;
}
