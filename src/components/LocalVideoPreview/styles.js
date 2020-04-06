import styled from 'styled-components';

import VideoTrack from '../VideoTrack/VideoTrack';
import Typography from '@material-ui/core/Typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(var(--vh) * 100);
  width: 100%;
  padding-top: 3vh;
`;

export const Title = styled(Typography).attrs({ variant: 'h4' })`
  color: ${props => props.theme.palette.primary.light};
`;

export const Subtitle = styled(Typography).attrs({ variant: 'subtitle1' })``;

export const Description = styled(Typography)`
  text-align: center;
  margin: 15px 30px 0 30px;
  @media (min-width: 600px) {
    width: 50%;
  }
`;

export const StyledVideoTrack = styled(VideoTrack)`
  height: calc(var(--vh) * 45);
  width: 100%;
  object-fit: cover;
  transform: scalex(-1);
  @media (min-width: 480px) {
    width: 80%;
  }
  @media (min-width: 600px) {
    width: 60%;
  }
  @media (min-width: 960px) {
    width: 480px;
  }
`;

export const NoVideo = styled.div`
  background-color: black;
  height: calc(var(--vh) * 45);
  width: 100%;
  @media (min-width: 480px) {
    width: 80%;
  }
  @media (min-width: 600px) {
    width: 60%;
  }
  @media (min-width: 960px) {
    width: 480px;
  }
`;
