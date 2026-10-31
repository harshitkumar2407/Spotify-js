const audio = new Audio();

export const getAudio = () => audio;

export const seekTo = (time) => {
  audio.currentTime = time;
};