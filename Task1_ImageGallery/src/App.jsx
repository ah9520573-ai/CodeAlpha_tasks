import { useState } from 'react'
import ImageGallery from './components/ImageGallery'
import CategoryFilter from './components/CategoryFilter'
import Lightbox from './components/Lightbox'
import { galleryData, categories } from './imageData'

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Filter images based on selected category
  const filteredImages = activeCategory === 'All'
    ? galleryData
    : galleryData.filter((img) => img.category === activeCategory)

  // Get index of selected image in filtered array
  const selectedImageIndex = filteredImages.findIndex(
    (img) => img.id === selectedImage?.id
  )

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setLightboxOpen(true)
  }

  const handleNextImage = () => {
    const nextIndex = (selectedImageIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
  }

  const handlePrevImage = () => {
    const prevIndex =
      selectedImageIndex === 0
        ? filteredImages.length - 1
        : selectedImageIndex - 1
    setSelectedImage(filteredImages[prevIndex])
  }

  const handleCloseLightbox = () => {
    setLightboxOpen(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Image Gallery</h1>
          <p className="subtitle">Explore our collection • Use arrow keys to navigate • Press Escape to close</p>
        </div>
      </header>

      <main className="app-main">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ImageGallery images={filteredImages} onImageClick={handleImageClick} />
      </main>

      <Lightbox
        image={selectedImage}
        isOpen={lightboxOpen}
        onClose={handleCloseLightbox}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </div>
  )
}
