import React, { useRef, useEffect } from 'react'
import { formatTime } from '../songData'

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
  isLoading
}) {
  const progressRef = useRef(null)

  const percentage = duration ? (currentTime / duration) * 100 : 0

  const handleClick = (e) => {
    if (isLoading || !duration) return

    const rect = progressRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration

    onSeek(newTime)
  }

  const handleTouchStart = (e) => {
    if (isLoading || !duration) return
    handleClick(e.touches[0])
  }

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        ref={progressRef}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-label="Seek"
        aria-valuemin="0"
        aria-valuemax={Math.round(duration || 0)}
        aria-valuenow={Math.round(currentTime || 0)}
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
          <div className="progress-handle" />
        </div>
      </div>
      
      <div className="time-display">
        <span className="current-time">{formatTime(currentTime)}</span>
        <span className="total-time">{formatTime(duration)}</span>
      </div>
    </div>
  )
}
