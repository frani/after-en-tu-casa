import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Input = styled(TextField)`
  margin: 0 10px 10px 0;
`;

export const Submit = styled(Button).attrs(props => ({
  variant: props.variant || 'contained',
  color: 'primary',
}))``;
