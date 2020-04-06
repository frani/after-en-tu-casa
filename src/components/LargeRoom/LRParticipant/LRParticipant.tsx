import React from 'react';
import LRParticipantInfo from '../LRParticipantInfo/LRParticipantInfo';
import LRParticipantTracks from '../LRParticipantTracks/LRParticipantTracks';
import { LocalParticipant, RemoteParticipant } from 'twilio-video';

interface ParticipantProps {
  participant: LocalParticipant | RemoteParticipant;
  disableAudio?: boolean;
  enableScreenShare?: boolean;
  onClick: () => void;
  isSelected: boolean;
}

export default function Participant({
  participant,
  disableAudio,
  enableScreenShare,
  onClick,
  isSelected,
}: ParticipantProps) {
  return (
    <LRParticipantInfo participant={participant} onClick={onClick} isSelected={isSelected}>
      <LRParticipantTracks
        participant={participant}
        disableAudio={disableAudio}
        enableScreenShare={enableScreenShare}
      />
    </LRParticipantInfo>
  );
}
