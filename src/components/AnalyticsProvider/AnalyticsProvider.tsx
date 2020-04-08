import React, { useContext, useEffect, createContext, ReactNode } from 'react';
import Amplitude, { AmplitudeClient } from 'amplitude-js';

import { useAppState } from '../../state';

declare type AmplitudeContextType = {
  amplitude: AmplitudeClient;
};

export const AmplitudeContext = createContext<AmplitudeContextType>(null!);

declare type AnalyticsProviderProps = {
  children: ReactNode;
};

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const { nick } = useAppState();

  useEffect(() => {
    Amplitude.getInstance().init('c6d12940463c5c92a3e4118005c4894d');
  }, []);

  useEffect(() => {
    if (nick !== '') {
      const identify = new Amplitude.Identify().set('nick', nick);
      Amplitude.identify(identify);
    }
  }, [nick]);

  return (
    <AmplitudeContext.Provider value={{ amplitude: Amplitude.getInstance() }}>
      {children}
    </AmplitudeContext.Provider>
  );
}

export const useAnalytics = () => useContext(AmplitudeContext);
