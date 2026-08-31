import React from 'react'

export default function Lightbox({ image, isOpen, onClose, onPrev, onNext }) {
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen || !image) return null

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
          ✕
        </button>
        
        <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="Previous image">
          ❮
        </button>
        
        <div className="lightbox-image-container">
          <img src={image.src} alt={image.alt} className="lightbox-image" />
          <div className="lightbox-info">
            <h3>{image.title}</h3>
            <p className="lightbox-category">{image.category}</p>
          </div>
        </div>
        
        <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="Next image">
          ❯
        </button>
      </div>
    </div>
  )
}
