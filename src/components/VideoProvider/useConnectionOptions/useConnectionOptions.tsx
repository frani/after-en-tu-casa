import { ConnectOptions } from 'twilio-video';

export default function useConnectionOptions(roomType: string | null): ConnectOptions {
  let connectionOptions: ConnectOptions = {
    bandwidthProfile: {
      video: {
        renderDimensions: {
          high: { height: 1080, width: 1920 },
          standard: { height: 720, width: 1280 },
          low: { height: 176, width: 144 },
        },
      },
    },
    networkQuality: { local: 1, remote: 1 },
    preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
  };
  if (roomType === 'collaboration') {
    connectionOptions = {
      bandwidthProfile: {
        video: {
          mode: 'collaboration',
          maxTracks: 10,
          dominantSpeakerPriority: 'standard',
          renderDimensions: {
            high: { height: 1080, width: 1920 },
            standard: { height: 720, width: 1280 },
            low: { height: 176, width: 144 },
          },
        },
      },
      dominantSpeaker: true,
      maxAudioBitrate: 16000,
      networkQuality: { local: 1, remote: 1 },
      preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
    };
  }
  return connectionOptions;
}
