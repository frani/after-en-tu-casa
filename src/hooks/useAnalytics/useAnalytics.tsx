import { useContext } from 'react';
import { AmplitudeContext } from '../../components/AnalyticsProvider/AnalyticsProvider';

export default function useAnalytics() {
  const { amplitude } = useContext(AmplitudeContext);
  return { amplitude };
}
