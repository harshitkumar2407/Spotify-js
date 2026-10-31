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
  setCurrentTime,
  setDuration,
  setVolume,
  setMuted,
} = playerSlice.actions;

export default playerSlice.reducer;
