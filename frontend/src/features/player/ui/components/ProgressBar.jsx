import { useSelector } from "react-redux";

import { seekTo } from "../../services/audioEngine";
import "./ProgressBar.css";

const ProgressBar = () => {
  const { currentTime, duration } = useSelector(
    (state) => state.player
  );

  const safeDuration =
    Number.isFinite(duration) && duration > 0 ? duration : 0;
  const safeCurrentTime =
    Number.isFinite(currentTime)
      ? Math.min(Math.max(currentTime, 0), safeDuration)
      : 0;

  const formatTime = (time) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    seekTo(Number(e.target.value));
  };

  const progress = safeDuration
    ? (safeCurrentTime / safeDuration) * 100
    : 0;

  return (
    <div className="progress-bar">
      <span className="progress-bar__time">{formatTime(safeCurrentTime)}</span>

      <input
        className="progress-bar__slider"
        type="range"
        min="0"
        max={safeDuration}
        value={safeCurrentTime}
        onChange={handleSeek}
        disabled={!safeDuration}
        aria-label="Playback position"
        aria-valuetext={`${formatTime(safeCurrentTime)} of ${formatTime(safeDuration)}`}
        style={{
          "--progress": `${progress}%`,
        }}
      />

      <span className="progress-bar__time">{formatTime(safeDuration)}</span>
    </div>
  );
};

export default ProgressBar;