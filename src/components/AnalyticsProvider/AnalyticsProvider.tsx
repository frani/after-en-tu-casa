import React, { useEffect, createContext, ReactNode } from 'react';
import Amplitude from 'amplitude-js';

import { Callback } from '../../types';
import { useAppState } from '../../state';

declare type AmplitudeContextType = {
  logEvent: Callback;
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

  const logEvent = (event: string, data?: any, callback?: Callback) => {
    Amplitude.getInstance().logEvent(event, data, callback);
  };

  return <AmplitudeContext.Provider value={{ logEvent }}>{children}</AmplitudeContext.Provider>;
}
