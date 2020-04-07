import React, { createContext, ReactNode, useState } from 'react';
import { ConnectOptions, Room, TwilioError, LocalAudioTrack, LocalVideoTrack } from 'twilio-video';
import { Callback, ErrorCallback } from '../../types';
import { SelectedParticipantProvider } from './useSelectedParticipant/useSelectedParticipant';

import useConnectionOptions from './useConnectionOptions/useConnectionOptions';
import useHandleRoomDisconnectionErrors from './useHandleRoomDisconnectionErrors/useHandleRoomDisconnectionErrors';
import useHandleOnDisconnect from './useHandleOnDisconnect/useHandleOnDisconnect';
import useHandleTrackPublicationFailed from './useHandleTrackPublicationFailed/useHandleTrackPublicationFailed';
import useLocalTracks from './useLocalTracks/useLocalTracks';
import useRoom from './useRoom/useRoom';

/*
 *  The hooks used by the VideoProvider component are different than the hooks found in the 'hooks/' directory. The hooks
 *  in the 'hooks/' directory can be used anywhere in a video application, and they can be used any number of times.
 *  the hooks in the 'VideoProvider/' directory are intended to be used by the VideoProvider component only. Using these hooks
 *  elsewhere in the application may cause problems as these hooks should not be used more than once in an application.
 */

export interface IVideoContext {
  room: Room;
  roomType: string;
  setRoomType: Callback;
  localTracks: (LocalAudioTrack | LocalVideoTrack)[];
  isConnecting: boolean;
  connect: (token: string) => Promise<void>;
  onError: ErrorCallback;
  onDisconnect: Callback;
  getLocalVideoTrack: () => Promise<LocalVideoTrack>;
  stopLocalTracks: Callback;
}

export const VideoContext = createContext<IVideoContext>(null!);

interface VideoProviderProps {
  options?: ConnectOptions;
  onError: ErrorCallback;
  onDisconnect?: Callback;
  children: ReactNode;
}

export function VideoProvider({
  options,
  children,
  onError = () => {},
  onDisconnect = () => {},
}: VideoProviderProps) {
  const onErrorCallback = (error: TwilioError) => {
    console.log(`ERROR: ${error.message}`, error);
    onError(error);
  };

  const [roomType, setRoomType] = useState<string>(null!);
  const connectionOptions = useConnectionOptions(roomType);

  const { localTracks, getLocalVideoTrack, stopLocalTracks } = useLocalTracks();
  const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, connectionOptions);

  // Register onError and onDisconnect callback functions.
  useHandleRoomDisconnectionErrors(room, onError);
  useHandleTrackPublicationFailed(room, onError);
  useHandleOnDisconnect(room, onDisconnect);

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError: onErrorCallback,
        onDisconnect,
        getLocalVideoTrack,
        stopLocalTracks,
        connect,
        roomType,
        setRoomType,
      }}
    >
      <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider>
    </VideoContext.Provider>
  );
}
