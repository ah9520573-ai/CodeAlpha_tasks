/**
 * Sample song data with metadata
 * Uses royalty-free placeholder audio and cover images
 */

export const songsList = [
  {
    id: 1,
    title: 'Sunset Dreams',
    artist: 'Luna Wave',
    duration: 245,
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/300/300?random=1'
  },
  {
    id: 2,
    title: 'Neon Nights',
    artist: 'Cyber Echo',
    duration: 198,
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/300/300?random=2'
  },
  {
    id: 3,
    title: 'Digital Rain',
    artist: 'Pixel Dreams',
    duration: 267,
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/300/300?random=3'
  },
  {
    id: 4,
    title: 'Urban Pulse',
    artist: 'Metro Beats',
    duration: 215,
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    cover: 'https://picsum.photos/300/300?random=4'
  },
  {
    id: 5,
    title: 'Cosmic Journey',
    artist: 'Star Light',
    duration: 289,
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    cover: 'https://picsum.photos/300/300?random=5'
  },
  {
    id: 6,
    title: 'Electric Harmony',
    artist: 'Synth Wave',
    duration: 234,
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    cover: 'https://picsum.photos/300/300?random=6'
  }
]

/**
 * Format seconds to MM:SS
 */
export const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00'
  
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}
