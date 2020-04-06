import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';

const ParticipantListItem = ({ participant }) => (
  <ListItem component="div" data-test="participant-list-item">
    <ListItemIcon>
      <PersonIcon />
    </ListItemIcon>
    <ListItemText>{participant.identity}</ListItemText>
  </ListItem>
);

ParticipantListItem.propTypes = {
  participant: PropTypes.shape({
    identity: PropTypes.string.isRequired,
  }).isRequired,
};

export default ParticipantListItem;
