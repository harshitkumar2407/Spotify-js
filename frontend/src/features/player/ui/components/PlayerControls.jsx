import { useDispatch, useSelector } from "react-redux";
import {
  CirclePlay,
  CirclePause,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

import { getAudio, playTrack, seekTo } from "../../services/audioEngine";
import {
  cycleRepeatMode,
  setCurrentTrack,
  toggleShuffle,
} from "../../state/playerSlice";
import "./PlayerControls.css";

const PlayerControls = () => {
  const dispatch = useDispatch();
  const {
    currentSong,
    isPlaying,
    queue,
    currentIndex,
    isShuffleEnabled,
    repeatMode,
    currentTime,
  } = useSelector((state) => state.player);

  const startTrack = async (index) => {
    const song = queue[index];
    if (!song) return;

    dispatch(setCurrentTrack({ song, index }));
    try {
      await playTrack(song);
    } catch (error) {
      console.error("Unable to play selected track.", error);
    }
  };

  const handlePlayPause = async () => {
    const audio = getAudio();
    if (isPlaying) {
      audio.pause();
      return;
    }

    if (!currentSong && queue.length) {
      await startTrack(0);
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      console.error("Unable to resume playback.", error);
    }
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      seekTo(0);
      return;
    }
    if (currentIndex > 0) startTrack(currentIndex - 1);
  };

  const handleNext = () => {
    if (!queue.length) return;

    let nextIndex;
    if (isShuffleEnabled && queue.length > 1) {
      const candidates = queue
        .map((_, index) => index)
        .filter((index) => index !== currentIndex);
      nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
    } else if (currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (repeatMode === "all") {
      nextIndex = 0;
    }

    if (nextIndex !== undefined) startTrack(nextIndex);
  };

  const isDisabled = !currentSong && !queue.length;

  return (
    <div className="player-controls">
      <button
        className={`player-controls__button${isShuffleEnabled ? " is-active" : ""}`}
        type="button"
        onClick={() => dispatch(toggleShuffle())}
        aria-label="Toggle shuffle"
        aria-pressed={isShuffleEnabled}
        title="Shuffle"
      >
        <Shuffle size={18} aria-hidden="true" />
      </button>

      <button
        className="player-controls__button"
        type="button"
        onClick={handlePrevious}
        disabled={isDisabled || (currentIndex <= 0 && currentTime <= 3)}
        aria-label="Previous track"
        title="Previous"
      >
        <SkipBack size={20} fill="currentColor" aria-hidden="true" />
      </button>

      <button
        className="player-controls__play"
        type="button"
        onClick={handlePlayPause}
        disabled={isDisabled}
        aria-label={isPlaying ? "Pause" : "Play"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <CirclePause size={34} aria-hidden="true" />
        ) : (
          <CirclePlay size={34} aria-hidden="true" />
        )}
      </button>

      <button
        className="player-controls__button"
        type="button"
        onClick={handleNext}
        disabled={isDisabled || (currentIndex >= queue.length - 1 && repeatMode !== "all" && !isShuffleEnabled)}
        aria-label="Next track"
        title="Next"
      >
        <SkipForward size={20} fill="currentColor" aria-hidden="true" />
      </button>

      <button
        className={`player-controls__button${repeatMode !== "off" ? " is-active" : ""}`}
        type="button"
        onClick={() => dispatch(cycleRepeatMode())}
        aria-label={`Repeat ${repeatMode}`}
        aria-pressed={repeatMode !== "off"}
        title={`Repeat ${repeatMode}`}
      >
        {repeatMode === "one" ? (
          <Repeat1 size={18} aria-hidden="true" />
        ) : (
          <Repeat size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};

export default PlayerControls;