import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MusicStage from './components/MusicStage'
import PlayerControls from './components/PlayerControls'
import ProgressBar from './components/ProgressBar'
import VolumeControl from './components/VolumeControl'
import "./GlobalPlayer.css"
import { searchSongApi } from '../../home/api/api'
import { getAudio, loadTrack, playTrack } from '../services/audioEngine'
import {
    setCurrentTime,
    setCurrentTrack,
    setDuration,
    setIsPlaying,
    setQueue,
} from '../state/playerSlice'

const GlobalPlayer = () => {
    const dispatch = useDispatch();
    const { queue, currentIndex, repeatMode, isShuffleEnabled } = useSelector((state) => state.player);

    // TEMP: remove this demo track loader once progress-bar testing is complete.
    useEffect(() => {
        let isMounted = true;

        const loadDefaultTrack = async () => {
            const audio = getAudio();
            if (audio.src) return;

            try {
                const results = await searchSongApi("Samjho Na");
                if (!isMounted || audio.src) return;

                const playableTracks = Array.isArray(results)
                    ? results.filter((track) => track?.stream?.url)
                    : [];
                if (!playableTracks.length) {
                    throw new Error("No playable demo tracks were returned.");
                }

                dispatch(setQueue(playableTracks));
                dispatch(setCurrentTrack({ song: playableTracks[0], index: 0 }));
                dispatch(setCurrentTime(0));
                dispatch(setDuration(0));
                loadTrack(playableTracks[0]);
            } catch (error) {
                console.error("Unable to load the temporary demo track.", error);
            }
        };

        loadDefaultTrack();
        return () => {
            isMounted = false;
        };
    }, [dispatch]);
    // END TEMP demo track loader.

    useEffect(()=>{
        const audio = getAudio();
        const updateTime = () => {
            dispatch(setCurrentTime(audio.currentTime));
        }
        const updateDuration = () => {
            dispatch(setDuration(Number.isFinite(audio.duration) ? audio.duration : 0));
        };
        const updatePlaying = () => dispatch(setIsPlaying(true));
        const updatePaused = () => dispatch(setIsPlaying(false));
        const playNextTrack = async () => {
            if (repeatMode === "one" && queue[currentIndex]) {
                try {
                    await playTrack(queue[currentIndex]);
                } catch (error) {
                    console.error("Unable to repeat track.", error);
                }
                return;
            }

            if (!queue.length) {
                dispatch(setIsPlaying(false));
                return;
            }

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

            if (nextIndex === undefined) {
                dispatch(setIsPlaying(false));
                return;
            }

            const song = queue[nextIndex];
            dispatch(setCurrentTrack({ song, index: nextIndex }));
            try {
                await playTrack(song);
            } catch (error) {
                console.error("Unable to play next track.", error);
            }
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("durationchange", updateDuration);
        audio.addEventListener("play", updatePlaying);
        audio.addEventListener("pause", updatePaused);
        audio.addEventListener("ended", playNextTrack);

        return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("play", updatePlaying);
      audio.removeEventListener("pause", updatePaused);
      audio.removeEventListener("ended", playNextTrack);
    };

    },[currentIndex, dispatch, isShuffleEnabled, queue, repeatMode])




  return (
    <div className="global-player">
      <MusicStage />
      <div className="global-player__main">
        <PlayerControls />
        <ProgressBar />
        </div>
      <VolumeControl />
    </div>
  );
}

export default GlobalPlayer