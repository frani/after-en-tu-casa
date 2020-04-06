import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 20px;
  height: calc(var(--vh) * 50);
  width: 100%;
`;

export const Title = styled(Typography).attrs({
  variant: 'h4',
  color: 'primary',
})``;

export const Subtitle = styled(Typography).attrs({ variant: 'h6' })`
  color: ${props => props.theme.palette.primary.light};
`;

export const Description = styled(Typography)``;
