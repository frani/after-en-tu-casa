import { useContext } from 'react';
import { AmplitudeContext } from '../../components/AnalyticsProvider/AnalyticsProvider';

export default function useAnalytics() {
  const { logEvent, logEventWithTimestamp } = useContext(AmplitudeContext);
  return { logEvent, logEventWithTimestamp };
}
