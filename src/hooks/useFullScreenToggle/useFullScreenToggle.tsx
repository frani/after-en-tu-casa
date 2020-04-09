import { useCallback, useState, useEffect } from 'react';
import fscreen from 'fscreen';
import useAnalytics from '../useAnalytics/useAnalytics';

export default function useFullScreenToggle() {
  const [isFullScreen, setIsFullScreen] = useState<Boolean>(!!fscreen.fullscreenElement);
  const { logEvent } = useAnalytics();

  useEffect(() => {
    const onFullScreenChange = () => setIsFullScreen(!!fscreen.fullscreenElement);
    fscreen.addEventListener('fullscreenchange', onFullScreenChange);
    return () => {
      fscreen.removeEventListener('fullscreenchange', onFullScreenChange);
    };
  }, []);

  const toggleFullScreen = useCallback(() => {
    if (isFullScreen) {
      fscreen.exitFullscreen();

      logEvent('FULL_SCREEN_EXIT');
    } else {
      fscreen.requestFullscreen(document.documentElement);

      logEvent('FULL_SCREEN_ENTER');
    }
  }, [isFullScreen, logEvent]);

  return [isFullScreen, toggleFullScreen] as const;
}
