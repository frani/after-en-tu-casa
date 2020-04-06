import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const sendMessageContainerHeight = '57px';
const chatDrawerWidth = '340px';

export const ChatDrawer = styled(Drawer).attrs({ anchor: 'right' })`
  & .MuiPaper-root {
    width: 100%;
    z-index: 1;
    padding-bottom: ${sendMessageContainerHeight};
  }
  @media (min-width: 600px) {
    & .MuiPaper-root {
      width: ${chatDrawerWidth};
    }
  }
`;

export const SendMessageContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  background-color: white;
  @media (min-width: 600px) {
    width: ${chatDrawerWidth};
  }
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const Submit = styled(Button).attrs({
  variant: 'text',
  color: 'primary',
  type: 'submit',
})``;

export const MessageList = styled(List)`
  overflow-y: auto;
`;

export const Message = styled(ListItemText)`
  & .MuiListItemText-primary {
    word-break: break-all;
  }
`;

export const MessageSender = styled.span`
  color: ${props => props.theme.palette.primary.main};
`;

export const CloseButton = styled(({ className, ...rest }) => (
  <IconButton className={className} {...rest}>
    <CloseIcon />
  </IconButton>
))`
  width: 50px;
  margin-left: auto;
`;
