import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import Video from 'twilio-video';

import { Container, Title, Description } from './styles';
import { useAppState } from '../../state';
import SimpleForm from '../SimpleForm/SimpleForm';
import Alert from '@material-ui/lab/Alert';

const Register = () => {
  const { nick, setNick } = useAppState();
  const [localNick, setLocalNick] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setLocalNick(e.target.value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (localNick) {
      setNick(localNick);
    }
    window.analytics.track('Event Join');
  };

  if (nick) return <Redirect to="/lobby" />;
  return (
    <Container>
      <Title>Welcome to Events</Title>
      <Description>
        An experiment in digital events. Please input a nickname to use at the rooms.
      </Description>
      <SimpleForm
        value={localNick}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitText="Join"
        label="Nickname"
        disabled={!Video.isSupported}
      />
      {!Video.isSupported && <Alert severity="warning">Please use Safari on iOS mobile.</Alert>}
    </Container>
  );
};

export default Register;
