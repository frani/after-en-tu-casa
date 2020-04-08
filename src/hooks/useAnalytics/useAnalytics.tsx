import { useContext } from 'react';
import { AmplitudeContext } from '../../components/AnalyticsProvider/AnalyticsProvider';

export default function useAnalytics() {
  const { logEvent } = useContext(AmplitudeContext);
  return { logEvent };
}
