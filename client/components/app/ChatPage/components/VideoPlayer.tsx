import { IMediaStream } from "@pushprotocol/restapi";
import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  stream: IMediaStream;
  isMuted: boolean;
}

export function VideoPlayer({ stream, isMuted }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [videoRef, stream]);

  return (
    <video
      ref={videoRef}
      muted={isMuted}
      autoPlay
      width="100%"
      className="aspect-square border-2 border-black"
    />
  );
}
