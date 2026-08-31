import { useState, useRef, useEffect } from 'react'
import PlaybackControls from './components/PlaybackControls'
import ProgressBar from './components/ProgressBar'
import VolumeControl from './components/VolumeControl'
import Playlist from './components/Playlist'
import { songsList } from './songData'

export default function App() {
  const audioRef = useRef(null)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [playlistOpen, setPlaylistOpen] = useState(false)

  const currentSong = songsList[currentIndex]

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        handlePlayPause()
      }
      if (e.code === 'KeyN') {
        handleNext()
      }
      if (e.code === 'KeyP') {
        handlePrevious()
      }
      if (e.code === 'KeyL') {
        setPlaylistOpen(!playlistOpen)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, currentIndex, playlistOpen])

  // Load audio and handle events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = currentSong.src
    audio.volume = volume
    
    // Set duration from songData as fallback
    setDuration(currentSong.duration)

    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }
    const handleEnded = () => handleNext()
    const handleError = () => {
      setIsLoading(false)
      console.error('Error loading audio:', audio.error)
    }

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Play error:', error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [currentIndex, isPlaying, volume])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (currentIndex < songsList.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setCurrentTime(0)
      setIsPlaying(true)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setCurrentTime(0)
      setIsPlaying(true)
    }
  }

  const handleSeek = (newTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleSelectSong = (index) => {
    setCurrentIndex(index)
    setCurrentTime(0)
    setIsPlaying(true)
    setPlaylistOpen(false)
  }

  return (
    <div className="app">
      <audio ref={audioRef} crossOrigin="anonymous" />

      <div className="player-container">
        {/* Album Art */}
        <div className="album-art-section">
          <div className={`album-art ${isPlaying ? 'playing' : ''}`}>
            <img src={currentSong.cover} alt={currentSong.title} />
          </div>
        </div>

        {/* Song Info */}
        <div className="song-info">
          <h2 className="song-title">{currentSong.title}</h2>
          <p className="song-artist">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          isLoading={isLoading}
        />

        {/* Playback Controls */}
        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < songsList.length - 1}
          isLoading={isLoading}
        />

        {/* Volume Control */}
        <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />

        {/* Playlist */}
        <Playlist
          songs={songsList}
          currentIndex={currentIndex}
          onSelectSong={handleSelectSong}
          isOpen={playlistOpen}
          onToggle={() => setPlaylistOpen(!playlistOpen)}
        />
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="keyboard-help">
        <p><kbd>Space</kbd> Play/Pause • <kbd>P</kbd> Previous • <kbd>N</kbd> Next • <kbd>L</kbd> Playlist</p>
      </div>
    </div>
  )
}
