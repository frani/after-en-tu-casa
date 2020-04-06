import React, { useMemo } from 'react';

import GridParticipantInfo from '../GridParticipantInfo/GridParticipantInfo';
import GridParticipantTracks from '../GridParticipantTracks/GridParticipantTracks';

export default function Participant({ participant, gridSize, gridPosition }) {
  const fullWidth = useMemo(() => {
    if (gridSize <= 2 || (gridSize === 3 && gridPosition === 2)) {
      return true;
    } else return false;
  }, [gridSize, gridPosition]);

  return (
    <GridParticipantInfo
      participant={participant}
      fullWidth={fullWidth}
      gridPosition={gridPosition}
    >
      <GridParticipantTracks participant={participant} />
    </GridParticipantInfo>
  );
}
