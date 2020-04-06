import React from 'react';
import styled from 'styled-components';

import MUIList from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';

export const List = styled(({ headerText, children, ...rest }) => (
  <MUIList
    component="nav"
    dense
    subheader={
      <ListSubheader component="div" color="primary" disableSticky>
        {headerText}
      </ListSubheader>
    }
    {...rest}
  >
    {children}
  </MUIList>
))`
  & .MuiListSubheader-root {
    font-size: 1.1rem;
  }
  padding-bottom: 36px;
`;
