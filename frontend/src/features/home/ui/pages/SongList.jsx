import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { searchSongApi } from "../../api/api";
import { useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setQueue,
} from "../../../player/state/playerSlice";
import { playTrack } from "../../../player/services/audioEngine";
import { Music2 } from "lucide-react";

const SongList = () => {
  const dispatch = useDispatch();

  const { name } = useParams();
  const [songsList, setSongsList] = useState(null);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadSongs = async () => {
      const data = await searchSongApi(name);
      if (isCurrentRequest) {
        setSongsList(Array.isArray(data) ? data : []);
      }
    };

    loadSongs();
    return () => {
      isCurrentRequest = false;
    };
  }, [name]);

  const handlePlay = async (val, index) => {
    dispatch(setQueue(songsList));
    dispatch(setCurrentTrack({ song: val, index }));

    try {
      await playTrack(val);
    } catch (error) {
      console.error("Unable to play selected track.", error);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl" aria-labelledby="song-list-heading">
      <header className="mb-6">
        <p className="text-sm font-semibold capitalize text-[#1ed760]">
          Search results
        </p>
        <h1 id="song-list-heading" className="mt-1 break-words text-2xl font-bold sm:text-3xl">
          {name?.replaceAll("_", " ")}
        </h1>
      </header>

      {songsList === null ? (
        <p className="py-8 text-center text-sm text-[#b3b3b3]" role="status">
          Searching for songs…
        </p>
      ) : songsList.length === 0 ? (
        <p className="py-8 text-center text-sm text-[#b3b3b3]">
          No playable songs found. Try another search.
        </p>
      ) : (
        <div className="flex flex-col gap-1">
          {songsList.map((song, index) => {
            const artwork =
              song.artwork?.["150x150"] ||
              song.artwork?.["480x480"] ||
              song.artwork;
            const artist = song.user?.name || "Unknown artist";

            return (
              <button
                type="button"
                onClick={() => handlePlay(song, index)}
                className="group flex min-w-0 items-center gap-3 rounded-md p-2 text-left transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:gap-4 sm:p-3"
                key={song.track_id}
              >
                {typeof artwork === "string" && artwork ? (
                  <img
                    className="size-12 shrink-0 rounded object-cover sm:size-14"
                    src={artwork}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span className="grid size-12 shrink-0 place-items-center rounded bg-[#282828] text-[#b3b3b3] sm:size-14">
                    <Music2 size={22} aria-hidden="true" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-white sm:text-base">
                    {song.title || "Untitled track"}
                  </span>
                  <span className="mt-1 block truncate text-xs text-[#b3b3b3] sm:text-sm">
                    {artist}
                  </span>
                </span>
                <span className="hidden shrink-0 text-xs text-[#b3b3b3] group-hover:text-white sm:block">
                  Play
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SongList;
