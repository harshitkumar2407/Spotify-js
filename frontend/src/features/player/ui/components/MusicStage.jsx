import { useDispatch, useSelector } from "react-redux";
import { CirclePlus, Music2 } from "lucide-react";

import { addToQueue } from "../../state/playerSlice";
import "./MusicStage.css";

const getArtwork = (artwork) => {
  if (typeof artwork === "string") return artwork;
  if (!artwork || typeof artwork !== "object") return "";

  return artwork["480x480"] || artwork["150x150"] || artwork["1000x1000"] || "";
};

const MusicStage = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.player.currentSong);

  const title = currentSong?.title || "Not playing";
  const artist =
    currentSong?.user?.name || currentSong?.artist || "Choose a song to play";
  const artwork = getArtwork(currentSong?.artwork);

  const handleAddToQueue = () => {
    if (currentSong) dispatch(addToQueue(currentSong));
  };

  return (
    <div className="music-stage">
      {artwork ? (
        <img className="music-stage__artwork" src={artwork} alt="" />
      ) : (
        <div className="music-stage__placeholder" aria-hidden="true">
          <Music2 size={26} />
        </div>
      )}

      <div className="music-stage__details">
        <span className="music-stage__title" title={title}>
          {title}
        </span>
        <span className="music-stage__artist" title={artist}>
          {artist}
        </span>
      </div>

      <button
        className="music-stage__queue-button"
        type="button"
        onClick={handleAddToQueue}
        disabled={!currentSong}
        aria-label={currentSong ? `Add ${title} to queue` : "No song to add"}
        title="Add to queue"
      >
        <CirclePlus size={32} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
};

export default MusicStage;
