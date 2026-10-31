import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Volume1, Volume2, VolumeX } from "lucide-react";

import { getAudio } from "../../services/audioEngine";
import { setMuted, setVolume } from "../../state/playerSlice";
import "./VolumeControl.css";

const VolumeControl = () => {
  const dispatch = useDispatch();
  const controlRef = useRef(null);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const { volume, isMuted } = useSelector((state) => state.player);
  const effectiveVolume = isMuted ? 0 : volume;

  useEffect(() => {
    const audio = getAudio();
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    if (!isSliderOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!controlRef.current?.contains(event.target)) {
        setIsSliderOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsSliderOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isSliderOpen]);

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

  const handleVolumeButtonClick = () => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      setIsSliderOpen((isOpen) => !isOpen);
      return;
    }

    handleToggleMute();
  };

  const VolumeIcon =
    effectiveVolume === 0
      ? VolumeX
      : effectiveVolume < 0.5
        ? Volume1
        : Volume2;

  return (
    <div
      className={`volume-control${isSliderOpen ? " volume-control--open" : ""}`}
      ref={controlRef}
    >
      <button
        className="volume-control__mute"
        type="button"
        onClick={handleVolumeButtonClick}
        aria-label={
          window.matchMedia("(max-width: 640px)").matches
            ? isSliderOpen
              ? "Hide volume slider"
              : "Show volume slider"
            : isMuted
              ? "Unmute"
              : "Mute"
        }
        aria-pressed={isMuted}
        aria-expanded={isSliderOpen}
        aria-controls="volume-range"
      >
        <VolumeIcon aria-hidden="true" size={18} />
      </button>
      <div className="volume-control__popup">
        <input
          id="volume-range"
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
    </div>
  );
};


export default VolumeControl;