import React from 'react'

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="category-filter-container">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}
