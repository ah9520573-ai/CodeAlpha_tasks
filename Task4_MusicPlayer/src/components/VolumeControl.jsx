import React from 'react'

export default function VolumeControl({ volume, onVolumeChange }) {
  return (
    <div className="volume-control">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
      
      <input
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value) / 100)}
        className="volume-slider"
        title="Volume"
        aria-label="Volume"
      />
      
      <span className="volume-percent">{Math.round(volume * 100)}%</span>
    </div>
  )
}
