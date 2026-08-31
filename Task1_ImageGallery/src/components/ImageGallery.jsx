import React from 'react'

export default function ImageGallery({ images, onImageClick }) {
  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.length === 0 ? (
          <p className="no-images">No images found in this category.</p>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => onImageClick(image)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onImageClick(image)
                }
              }}
              aria-label={`${image.title}, ${image.category}`}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <div className="gallery-hover-info">
                    <h3>{image.title}</h3>
                    <span className="gallery-category-tag">{image.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
