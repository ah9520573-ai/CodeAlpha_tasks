import React from 'react'

export default function Playlist({ songs, currentIndex, onSelectSong, isOpen, onToggle }) {
  return (
    <>
      {/* Toggle Button */}
      <button
        className="playlist-toggle"
        onClick={onToggle}
        title="Toggle playlist"
        aria-label="Toggle playlist"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.64-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
        </svg>
      </button>

      {/* Playlist Panel */}
      <div className={`playlist-panel ${isOpen ? 'open' : ''}`}>
        <div className="playlist-header">
          <h3>Playlist</h3>
          <button
            className="close-btn"
            onClick={onToggle}
            aria-label="Close playlist"
          >
            ✕
          </button>
        </div>

        <div className="playlist-content">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className={`playlist-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                onSelectSong(index)
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectSong(index)
                }
              }}
            >
              <div className="playlist-item-cover">
                <img src={song.cover} alt={song.title} />
                {index === currentIndex && (
                  <div className="now-playing-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="playlist-item-info">
                <div className="playlist-item-title">{song.title}</div>
                <div className="playlist-item-artist">{song.artist}</div>
              </div>

              <div className="playlist-item-duration">
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="playlist-overlay" onClick={onToggle} />
      )}
    </>
  )
}
