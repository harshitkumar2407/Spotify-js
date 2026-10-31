const audio = new Audio();

export const getAudio = () => audio;

export const seekTo = (time) => {
  audio.currentTime = time;
};

export const loadTrack = (track) => {
  const streamUrl = track?.stream?.url;
  if (!streamUrl) {
    throw new Error("This track does not have a playable stream URL.");
  }

  audio.src = streamUrl;
  audio.currentTime = 0;
  audio.load();
};

export const playTrack = async (track) => {
  const streamUrl = track?.stream?.url;
  if (!streamUrl) {
    throw new Error("This track does not have a playable stream URL.");
  }

  audio.src = streamUrl;
  audio.currentTime = 0;
  await audio.play();
};