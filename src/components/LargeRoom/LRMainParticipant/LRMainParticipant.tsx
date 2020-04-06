import React from 'react';

import LRMainParticipantInfo from '../LRMainParticipantInfo/LRMainParticipantInfo';
import LRParticipantTracks from '../LRParticipantTracks/LRParticipantTracks';
import useMainSpeaker from '../../../hooks/useMainSpeaker/useMainSpeaker';

export default function MainParticipant() {
  const mainParticipant = useMainSpeaker();
  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <LRMainParticipantInfo participant={mainParticipant}>
      <LRParticipantTracks
        participant={mainParticipant}
        disableAudio
        enableScreenShare
        videoPriority="high"
      />
    </LRMainParticipantInfo>
  );
}
