import React from 'react'
import { formatTime } from '../songData'

export default function PlaybackControls({
  isPlaying,
  onPlayPause,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isLoading
}) {
  return (
    <div className="playback-controls">
      {/* Previous Button */}
      <button
        className="control-btn prev-btn"
        onClick={onPrevious}
        disabled={!hasPrevious}
        title="Previous track (P)"
        aria-label="Previous track"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
        </svg>
      </button>

      {/* Play/Pause Button */}
      <button
        className="control-btn play-btn"
        onClick={onPlayPause}
        title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isLoading ? (
          <div className="spinner" />
        ) : isPlaying ? (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Next Button */}
      <button
        className="control-btn next-btn"
        onClick={onNext}
        disabled={!hasNext}
        title="Next track (N)"
        aria-label="Next track"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 18h2V6h-2v12zM2 18l8.5-6L2 6v12z" />
        </svg>
      </button>
    </div>
  )
}
