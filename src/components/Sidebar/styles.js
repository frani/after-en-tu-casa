import React from 'react';
import styled from 'styled-components';

import MaterialUIButton from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export const MenuButton = styled(({ handleToggle, ...rest }) => (
  <Hidden mdUp>
    <IconButton edge="start" onClick={handleToggle} {...rest}>
      <MenuIcon />
    </IconButton>
  </Hidden>
))`
  position: fixed;
  background-color: ${props => props.theme.palette.primary.main};
  color: white;
  z-index: 1;
  border-radius: 4px;
`;

export const DesktopDrawer = styled(Drawer).attrs({
  variant: 'permanent',
  open: true,
})`
  display: inline;
  & .MuiPaper-root {
    width: 240px;
    z-index: 1;
  }
`;

export const MobileDrawer = styled(SwipeableDrawer).attrs({
  variant: 'temporary',
})`
  display: inline;
  & .MuiPaper-root {
    width: 240px;
    z-index: 1;
  }
`;

export const Button = styled(MaterialUIButton).attrs({
  color: 'primary',
  variant: 'contained',
})`
  border-radius: 0;
  margin-bottom: 5px;
`;

export const StickyBottomButton = styled(Button)`
  position: fixed;
  width: 240px;
  bottom: 0;
`;
