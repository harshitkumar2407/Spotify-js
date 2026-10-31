import { createSlice } from "@reduxjs/toolkit";

let playerSlice = createSlice({
  name: "player",
  initialState: {
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isShuffleEnabled: false,
    repeatMode: "off",
    queue: [],
    currentIndex: -1,
  },
  reducers: {
    addSong: (state, action) => {
      state.currentSong = action.payload;
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentSong = action.payload.song;
      state.currentIndex = action.payload.index;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = Boolean(action.payload);
    },
    toggleShuffle: (state) => {
      state.isShuffleEnabled = !state.isShuffleEnabled;
    },
    cycleRepeatMode: (state) => {
      state.repeatMode =
        state.repeatMode === "off"
          ? "all"
          : state.repeatMode === "all"
            ? "one"
            : "off";
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      const volume = Number(action.payload);
      if (Number.isFinite(volume)) {
        state.volume = Math.min(Math.max(volume, 0), 1);
      }
    },
    setMuted: (state, action) => {
      state.isMuted = Boolean(action.payload);
    },
  },
});

export const {
  addSong,
  addToQueue,
  setQueue,
  setCurrentTrack,
  setIsPlaying,
  toggleShuffle,
  cycleRepeatMode,
  setCurrentTime,
  setDuration,
  setVolume,
  setMuted,
} = playerSlice.actions;

export default playerSlice.reducer;
