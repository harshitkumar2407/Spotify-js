import React, { useEffect } from 'react'
import MusicStage from './components/MusicStage'
import PlayerControls from './components/PlayerControls'
import ProgressBar from './components/ProgressBar'
import VolumeControl from './components/VolumeControl'
import { useDispatch } from 'react-redux'
import { getAudio } from '../services/audioEngine'
import { setDuration } from '../state/playerSlice'

const GlobalPlayer = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const audio = getAudio();
        const updateTime = ()=>{
            dispatch(setDuration(audio.duration))
        }
        const updateDuration = () => {
            dispatch(setDuration(audio.currentTime));
        };

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", updateDuration);

        return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };

    },[])




  return (
    <div className='flex justify-between'>

        <MusicStage/>
        <div>

        <PlayerControls/>
        <ProgressBar/>
        </div>
        <VolumeControl/>

    </div>
  )
}

export default GlobalPlayer