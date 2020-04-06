import { useEffect } from 'react';

export default function useTrueViewportHeightUnit() {
  useEffect(() => {
    const setViewportHeightUnit = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeightUnit();

    window.addEventListener('resize', setViewportHeightUnit);

    return () => {
      window.removeEventListener('resize', setViewportHeightUnit);
      document.documentElement.style.removeProperty('--vh');
    };
  }, []);
}
