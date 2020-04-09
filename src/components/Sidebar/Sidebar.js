import React, { useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';

import useUIState from '../UIStateProvider/useUIState/useUIState';
import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../state';
import roomNames, { getRoomName } from '../../util/roomNames';
import useRoomState from '../../hooks/useRoomState/useRoomState';
import useRooms from '../RoomsProvider/useRooms/useRooms';
import useAnalytics from '../../hooks/useAnalytics/useAnalytics';

import RoomList from './RoomList/RoomList';
import HelpDialog from './HelpDialog/HelpDialog';

import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import { Button, MobileDrawer, DesktopDrawer, MenuButton, StickyBottomContainer } from './styles';

const Sidebar = () => {
  const { nick, setNick, getToken, isFetching } = useAppState();
  const { isConnecting, connect, room, setRoomType, stopLocalTracks } = useVideoContext();
  const { showMobileUi, showMobileSidebar, toggleMobileSidebar } = useUIState();
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const { roomsState } = useRooms();
  const roomState = useRoomState();
  const { logEvent } = useAnalytics();

  const handleCreateRoom = async roomType => {
    if (!canCreateRoom) return;

    const roomName = getRoomName(roomsState.rooms);

    const token = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify({
        roomName,
        roomType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => getToken(nick, roomName));

    if (roomState === 'connected') room.disconnect();

    setRoomType(roomType);
    connect(token);

    logEvent('ROOM_CREATE', { roomType });
  };

  const handleRoomClick = async (roomName, roomType) => {
    if (!canJoinRoom) return;
    roomState === 'connected'
      ? logEvent('ROOM_SWITCH', { roomType })
      : logEvent('ROOM_JOIN', { roomType });

    if (roomState === 'connected') room.disconnect();
    const token = await getToken(nick, roomName);
    setRoomType(roomType);
    connect(token);
  };

  const canJoinRoom = useMemo(() => {
    return (
      !isFetching &&
      !isConnecting &&
      !roomsState.isFetching &&
      roomsState.rooms.length < roomNames.length
    );
  }, [isFetching, isConnecting, roomsState]);

  const canCreateRoom = useMemo(() => {
    return canJoinRoom && roomsState.rooms.length < roomNames.length;
  }, [canJoinRoom, roomsState]);

  const handleLeaveLobby = () => {
    setNick('');
    stopLocalTracks();
    if (room.sid) {
      room.disconnect();
    }

    logEvent('LOBBY_LEAVE');
    return <Redirect to="/" />;
  };

  const handleSupportRequest = () => {
    setShowHelpDialog(true);

    logEvent('HELP_MODAL_OPEN');
  };

  const handleClose = () => {
    setShowHelpDialog(false);
  };

  const drawer = (
    <>
      <Button onClick={() => handleCreateRoom('grid')} disabled={!canCreateRoom}>
        Crear Sala Chica
      </Button>
      <Button onClick={() => handleCreateRoom('collaboration')} disabled={!canCreateRoom}>
        Crear Sala Grande
      </Button>
      <RoomList
        rooms={roomsState.rooms}
        onRoomClick={handleRoomClick}
        canJoinRoom={canJoinRoom}
        activeRoom={room.name}
      />
      <StickyBottomContainer>
        <HelpDialog open={showHelpDialog} handleClose={handleClose} />
        <Button onClick={handleSupportRequest} color="secondary">
          Algo no funciona?
        </Button>
        <Button onClick={handleLeaveLobby}>Logout</Button>
      </StickyBottomContainer>
    </>
  );

  return (
    <>
      <Collapse in={showMobileUi}>
        <MenuButton handleToggle={toggleMobileSidebar} />
      </Collapse>
      <Hidden mdUp>
        <MobileDrawer
          open={showMobileSidebar}
          onClose={toggleMobileSidebar}
          onOpen={toggleMobileSidebar}
          ModalProps={{ keepMounted: true }}
        >
          {drawer}
        </MobileDrawer>
      </Hidden>
      <Hidden smDown>
        <DesktopDrawer>{drawer}</DesktopDrawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
