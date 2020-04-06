import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Sidebar from './components/Sidebar/Sidebar';
import Controls from './components/Controls/Controls';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import ReconnectingNotification from './components/ReconnectingNotification/ReconnectingNotification';
import LargeRoom from './components/LargeRoom/LargeRoom';
import GridRoom from './components/GridRoom/GridRoom';
import RoomsProvider from './components/RoomsProvider/RoomsProvider';

import useRoomState from './hooks/useRoomState/useRoomState';
import useVideoContext from './hooks/useVideoContext/useVideoContext';
import { useAppState } from './state';

const Main = styled.main`
  height: calc(var(--vh) * 100);
  width: 100%;
  position: relative;
  @media (min-width: 960px) {
    left: 240px;
    width: calc(100% - 240px);
  }
`;

const App = () => {
  const roomState = useRoomState();
  const { nick } = useAppState();
  const { isConnecting, roomType } = useVideoContext();
  let content;

  if (!nick) return <Redirect to="/" />;

  if (roomState === 'disconnected' && !isConnecting) {
    content = <LocalVideoPreview />;
  } else if (roomState === 'disconnected') {
    content = <div />;
  } else if (roomType === 'grid') {
    content = <GridRoom />;
  } else {
    content = <LargeRoom />;
  }

  return (
    <>
      <RoomsProvider>
        <Sidebar />
      </RoomsProvider>
      <Main>
        {content}
        <Controls />
      </Main>
      <ReconnectingNotification />
    </>
  );
};

export default hot(module)(App);
