import React, { useRef, useEffect } from 'react';
import { Track } from 'twilio-video';
import { IVideoTrack } from '../../types';

interface VideoTrackProps {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority;
  className?: any;
}

export default function VideoTrack({ track, isLocal, priority, className }: VideoTrackProps) {
  const ref = useRef<HTMLVideoElement>(null!);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(el);
    return () => {
      track.detach(el);
      if (track.setPriority && priority) {
        // Passing `null` to setPriority will set the track's priority to that which it was published with.
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  // The local video track is mirrored.
  const style = isLocal ? { transform: 'rotateY(180deg)' } : {};

  return <video ref={ref} className={className} style={style} />;
}
