import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';
import Video from 'twilio-video';
import amplitude from 'amplitude-js';

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
    amplitude.getInstance().init('c6d12940463c5c92a3e4118005c4894d');
    amplitude.getInstance().logEvent('EVENT_JOIN');
  };

  if (nick) return <Redirect to="/lobby" />;
  return (
    <Container>
      <Title>After en tu casa</Title>
      <Description>
        Una juntada online para pasar la cuarentena entre amigos. Elegí un nick y entrá.
      </Description>
      <SimpleForm
        value={localNick}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitText="Unirse"
        label="Nick"
        disabled={!Video.isSupported}
      />
      {!Video.isSupported && (
        <Alert severity="warning">Porfavor entra desde Safari en iPhone.</Alert>
      )}
    </Container>
  );
};

export default Register;
