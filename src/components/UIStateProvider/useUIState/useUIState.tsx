import { useContext } from 'react';
import { UIStateContext } from '../UIStateProvider';

export default function useUIState() {
  const {
    showMobileSidebar,
    toggleMobileSidebar,
    showMobileUi,
    toggleMobileUi,
    showChatModal,
    toggleChatModal,
  } = useContext(UIStateContext);
  return {
    showMobileSidebar,
    toggleMobileSidebar,
    showMobileUi,
    toggleMobileUi,
    showChatModal,
    toggleChatModal,
  };
}
