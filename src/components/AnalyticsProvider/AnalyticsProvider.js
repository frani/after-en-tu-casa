import React, { useContext, useEffect, createContext, ReactNode } from 'react';
import Amplitude from 'amplitude-js';

export const AmplitudeContext = createContext(null);

export const useAnalytics = () => useContext(AmplitudeContext);

export default function AnalyticsProvider({ children }) {
  useEffect(() => {
    Amplitude.getInstance().init('c6d12940463c5c92a3e4118005c4894d');
  }, []);

  return (
    <AmplitudeContext.Provider value={{ amplitude: Amplitude.getInstance() }}>
      {children}
    </AmplitudeContext.Provider>
  );
}

/* 
	amplitude.getInstance().init('c6d12940463c5c92a3e4118005c4894d');
	const identify = new amplitude.Identify().set('nick', 'mau');
	amplitude.identify(identify);
	amplitude.getInstance().logEvent('EVENT_JOIN');
*/
