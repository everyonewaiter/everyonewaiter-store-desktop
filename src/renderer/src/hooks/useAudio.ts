import { useRef } from "react";

const useAudio = (source: string) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(source));

  const play = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return { play };
};

export default useAudio;
