# To Run:

- Fill the following enviroment variables for a Twilio account or sub-account.
  TWILIO_ACCOUNT_SID
  TWILIO_API_KEY_SID
  TWILIO_API_KEY_SECRET
  TWILIO_AUTH_TOKEN

- You also need to run an ngrok tunnel to the port 8081 `ngrok http 8081` or similar, for Twilio's API to reach localhost.
  API_TWILIO_CALLBACK_URL=https://15968772.ngrok.io
