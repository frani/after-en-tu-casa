import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export const CustomTypography = styled(({ isFull, children, ...rest }) => (
  <Typography {...rest}>{children}</Typography>
))`
  color: ${props => (props.isFull ? props.theme.palette.secondary.main : props.theme.palette.success.main)};
`;
