import React, { createContext, useState, ReactNode } from 'react';

import { Callback } from '../../types';
import useTrueViewportHeightUnit from '../../hooks/useTrueViewportHeightUnit';

interface IUIStateContext {
  showChatModal: boolean;
  toggleChatModal: Callback;
  showMobileSidebar: boolean;
  toggleMobileSidebar: Callback;
  showMobileUi: boolean;
  toggleMobileUi: Callback;
}

export const UIStateContext = createContext<IUIStateContext>(null!);

interface UIStateProviderProps {
  children: ReactNode;
}

const UIStateProvider = ({ children }: UIStateProviderProps) => {
  useTrueViewportHeightUnit();

  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const toggleMobileSidebar = () => setShowMobileSidebar(!showMobileSidebar);

  const [showMobileUi, setShowMobileUi] = useState(true);
  const toggleMobileUi = () => setShowMobileUi(!showMobileUi);

  const [showChatModal, setChatModal] = useState(false);
  const toggleChatModal = () => setChatModal(!showChatModal);

  return (
    <UIStateContext.Provider
      value={{
        showMobileSidebar,
        toggleMobileSidebar,
        showMobileUi,
        toggleMobileUi,
        showChatModal,
        toggleChatModal,
      }}
    >
      {children}
    </UIStateContext.Provider>
  );
};

export default UIStateProvider;
