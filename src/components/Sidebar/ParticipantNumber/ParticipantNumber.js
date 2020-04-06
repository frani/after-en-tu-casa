import React from 'react';

import { CustomTypography } from './styles';

const ParticipantNumber = ({ current, max }) => (
  <CustomTypography isFull={current === max}>
    {current} / {max}
  </CustomTypography>
);

export default ParticipantNumber;
