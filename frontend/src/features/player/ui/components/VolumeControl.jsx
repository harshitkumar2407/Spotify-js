import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Volume1, Volume2, VolumeX } from "lucide-react";

import { getAudio } from "../../services/audioEngine";
import { setMuted, setVolume } from "../../state/playerSlice";
import "./VolumeControl.css";

const VolumeControl = () => {
  const dispatch = useDispatch();
  const { volume, isMuted } = useSelector((state) => state.player);
  const effectiveVolume = isMuted ? 0 : volume;

  useEffect(() => {
    const audio = getAudio();
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  const handleVolumeChange = (event) => {
    dispatch(setVolume(Number(event.target.value)));
    dispatch(setMuted(false));
  };

  const handleToggleMute = () => {
    if (isMuted) {
      if (volume === 0) dispatch(setVolume(1));
      dispatch(setMuted(false));
      return;
    }

    dispatch(setMuted(true));
  };

  const VolumeIcon =
    effectiveVolume === 0
      ? VolumeX
      : effectiveVolume < 0.5
        ? Volume1
        : Volume2;

  return (
    <div className="volume-control">
      <button
        className="volume-control__mute"
        type="button"
        onClick={handleToggleMute}
        aria-label={isMuted ? "Unmute" : "Mute"}
        aria-pressed={isMuted}
      >
        <VolumeIcon aria-hidden="true" size={18} />
      </button>
      <input
        className="volume-control__slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={effectiveVolume}
        onChange={handleVolumeChange}
        aria-label="Volume"
        aria-valuetext={`${Math.round(effectiveVolume * 100)}%`}
        style={{ "--volume": `${effectiveVolume * 100}%` }}
      />
    </div>
  );
};


export default VolumeControl;