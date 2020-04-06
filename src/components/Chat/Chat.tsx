import React, { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';

import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
import { useAppState } from '../../state';
import useUIState from '../UIStateProvider/useUIState/useUIState';
import isBlank from '../../util/isBlank';

import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import {
  SendMessageContainer,
  Form,
  Submit,
  ChatDrawer,
  MessageSender,
  MessageList,
  Message,
  CloseButton,
} from './styles';
import ListItem from '@material-ui/core/ListItem';

interface IMessage {
  identity: string;
  message: string;
}

const Chat = () => {
  const { room } = useVideoContext();
  const { nick } = useAppState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { showChatModal, toggleChatModal } = useUIState();

  const ws = useRef<WebSocket>(null!);
  const messageListRef = useRef<HTMLUListElement | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isBlank(message)) return;

    ws.current.send(JSON.stringify({ identity: nick, message }));
    setMessage('');
  };

  useEffect(() => {
    let url = `ws://localhost:8081/chat/${room.name}`;
    if (process.env.NODE_ENV === 'production') {
      url = `wss://${window.location.host}/chat/${room.name}`;
    }

    ws.current = new WebSocket(url);

    ws.current.onmessage = msg => {
      setMessages(prevMessages => [...prevMessages, JSON.parse(msg.data)]);
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    };

    return () => {
      ws.current.close();
    };
  }, [room, showChatModal]);

  return (
    <ChatDrawer open={showChatModal} onClose={toggleChatModal}>
      <Hidden smUp>
        <CloseButton onClick={toggleChatModal} />
        <Divider />
      </Hidden>
      <MessageList ref={messageListRef}>
        {messages.map((msg, index) => (
          <ListItem dense={true}>
            <Message>
              <MessageSender>{msg.identity}</MessageSender>: {msg.message}
            </Message>
          </ListItem>
        ))}
      </MessageList>
      <SendMessageContainer>
        <Divider />
        <Form onSubmit={onSubmit}>
          <InputBase
            onChange={onChange}
            placeholder={'Send a chat message...'}
            value={message}
            fullWidth
          />
          <Submit disabled={isBlank(message)}>Send</Submit>
        </Form>
      </SendMessageContainer>
    </ChatDrawer>
  );
};

export default Chat;
