import React from 'react';
import GridPublication from '../GridPublication/GridPublication';
import usePublications from '../../../hooks/usePublications/usePublications';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

export default function ParticipantTracks({
  participant,
  disableAudio,
  enableScreenShare,
  videoPriority,
  children,
}) {
  const { room } = useVideoContext();
  const publications = usePublications(participant);
  const isLocal = participant === room.localParticipant;

  let filteredPublications;

  if (enableScreenShare && publications.some(p => p.trackName === 'screen')) {
    filteredPublications = publications.filter(p => p.trackName !== 'camera');
  } else {
    filteredPublications = publications.filter(p => p.trackName !== 'screen');
  }

  return (
    <>
      {children}
      {filteredPublications.map(publication => (
        <GridPublication
          key={publication.kind}
          publication={publication}
          participant={participant}
          isLocal={isLocal}
          disableAudio={disableAudio}
          videoPriority={videoPriority}
        />
      ))}
    </>
  );
}
