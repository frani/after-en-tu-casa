import React from 'react';
import styled from 'styled-components';

import Box from '@material-ui/core/Box';
import MUIContainer from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export const Container = styled(MUIContainer)`
  height: calc(var(--vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Title = styled(({ ...rest }) => (
  <Box color="primary.light">
    <Typography variant="h1" {...rest} />
  </Box>
))`
  @media (max-width: 960px) {
    font-size: 4rem;
  }

  @media (max-width: 600px) {
    font-size: 3rem;
  }
`;

export const Description = styled(Typography)`
  margin: 10px;
`;
