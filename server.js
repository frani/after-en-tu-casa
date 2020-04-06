const express = require('express');
const path = require('path');
const expressWs = require('express-ws')(express());
const app = expressWs.app;
const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const MAX_ALLOWED_SESSION_DURATION = 14400;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKeySID = process.env.TWILIO_API_KEY_SID;
const twilioApiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(twilioAccountSid, twilioAuthToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/token', (req, res) => {
  const { identity, roomName } = req.query;
  const token = new AccessToken(twilioAccountSid, twilioApiKeySID, twilioApiKeySecret, {
    ttl: MAX_ALLOWED_SESSION_DURATION,
  });
  token.identity = identity;
  const videoGrant = new VideoGrant({ room: roomName });
  token.addGrant(videoGrant);
  res.send(token.toJwt());
  console.log(`issued token for ${identity} in room ${roomName}`);
});

app.get('/api/rooms', async (req, res) => {
  let rooms = await client.video.rooms.list({ limit: 20 });
  let roomsWithParticipants = await Promise.all(
    rooms.map(async room => {
      let participants = await client.video
        .rooms(room.uniqueName)
        .participants.list({ status: 'connected' }, (err, participants) => participants);
      room.participants = participants;
      return room;
    })
  );

  res.set('Content-Type', 'application/json');
  res.send(roomsWithParticipants);
});

app.post('/api/rooms', async (req, res) => {
  const { roomName, roomType } = req.body;
  const maxParticipants = roomType === 'grid' ? 4 : 8;
  const type = roomType === 'grid' ? 'group-small' : 'group';

  let callbackUrl = process.env.API_TWILIO_CALLBACK_URL;
  if (process.env.NODE_ENV === 'production') {
    callbackUrl = `https://online-events.herokuapp.com/api/callback`;
  }

  const room = await client.video.rooms.create({
    uniqueName: roomName,
    statusCallback: callbackUrl,
    maxParticipants,
    type,
  });

  res.send(roomName);
});

app.post('/api/callback', async (req, res) => {
  const eventName = req.body.StatusCallbackEvent;
  const eventData = req.body;

  switch (eventName) {
    case 'room-created':
      const roomData = await client.video.rooms(eventData.RoomName).fetch();
      eventData.maxParticipants = roomData.maxParticipants;
      broadcastRoomEvent(eventName, eventData, expressWs.getWss());
      break;
    case 'room-ended':
      broadcastRoomEvent(eventName, eventData, expressWs.getWss());
      break;
    case 'participant-connected':
      broadcastParticipantEvent(eventName, eventData, expressWs.getWss());
      break;
    case 'participant-disconnected':
      broadcastParticipantEvent(eventName, eventData, expressWs.getWss());
      break;
    default:
      res.end();
  }
});

const getRouteWsClients = route => {
  const filteredClients = Array.from(expressWs.getWss().clients).filter(
    sock => sock.route === route
  );
  return filteredClients;
};

const broadcastRoomEvent = (name, event, wss) => {
  const filteredClients = getRouteWsClients('/');
  filteredClients.forEach(ws => {
    ws.send(
      JSON.stringify({
        uniqueName: event.RoomName,
        status: event.RoomStatus,
        event: name,
        sid: event.RoomSid,
        participants: [],
        maxParticipants: event.maxParticipants,
      })
    );
  });
};

const broadcastParticipantEvent = (name, event, wss) => {
  const filteredClients = getRouteWsClients('/');
  filteredClients.forEach(ws => {
    ws.send(
      JSON.stringify({
        roomName: event.RoomName,
        event: name,
        sid: event.ParticipantSid,
        identity: event.ParticipantIdentity,
      })
    );
  });
};

app.ws('/chat/:room', (ws, req) => {
  ws.route = req.path;
  ws.onmessage = msg => {
    const filteredClients = getRouteWsClients(req.path);
    filteredClients.forEach(sock => sock.send(msg.data));
  };
});

app.ws('/', (ws, req) => {
  ws.route = '/';

  let isAlive = true;

  const doPing = () => {
    if (isAlive) {
      isAlive = false;
      ws.ping('heartbeat');
    }
  };

  setInterval(doPing, 3000);

  ws.on('pong', () => (isAlive = true));

  ws.on('close', () => {
    isAlive = false;
    clearInterval(doPing);
  });
});

app.get('*', (_, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

const port = process.env.PORT || 8081;
app.listen(port, () => console.log(`token server running on ${port}`));
