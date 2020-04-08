import React from 'react';
import styled from 'styled-components';

import { Callback } from '../../../types';

import Dialog from '@material-ui/core/Dialog';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Content = styled.div`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
`;

const Description = styled(Typography)`
  margin-bottom: 5px;
`;

const StyledLink = styled(Link)`
  color: white;
`;

interface Props {
  open: boolean;
  handleClose: Callback;
}

export default function HelpDialog({ open, handleClose }: Props) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <Content>
        <Typography variant="h6">Necesitas Ayuda?</Typography>
        <Description>Soporte instantaneo si mensajeas al +542616027616</Description>
        <Button variant="contained" color="primary" startIcon={<WhatsAppIcon />}>
          <StyledLink href="https://is.gd/eMZbVS" target="_blank" rel="noopener">
            Contactame por WhatsApp
          </StyledLink>
        </Button>
      </Content>
    </Dialog>
  );
}
