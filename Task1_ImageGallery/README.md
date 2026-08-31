# 📸 CodeAlpha Image Gallery - React Frontend Task 1

A beautiful, responsive image gallery built with React and Vite for the CodeAlpha Frontend Web Development Internship.

## 🎯 Features

### Core Functionality
- **Image Grid Gallery** - Responsive CSS Grid layout that adapts to screen size
- **Category Filtering** - Filter images by category (All, Nature, Travel, Portraits)
- **Lightbox Modal** - Click any image to view enlarged version in a modal overlay
- **Image Navigation** - Next/Previous buttons to browse through images
- **Keyboard Navigation** - Arrow keys to navigate, Escape to close lightbox
- **Hover Effects** - Smooth transitions and image scaling on hover

### Design & UX
- **Responsive Design** - Fully responsive across mobile, tablet, and desktop
- **Dark Theme** - Modern dark UI with gradient backgrounds
- **CSS Variables** - Easy customization with CSS custom properties
- **Smooth Animations** - Transitions and hover effects for polish
- **Accessibility** - ARIA labels, semantic HTML, keyboard support

### Technical Highlights
- **Functional Components** - Built with React hooks (useState)
- **Local State Management** - No backend needed, uses component state
- **CSS Grid & Flexbox** - Modern layout techniques
- **Vanilla CSS** - No CSS frameworks, pure CSS styling
- **Vite Dev Server** - Fast HMR development experience

## 📦 Project Structure

```
Task 1/
├── index.html                 # HTML entry point
├── package.json              # Dependencies
├── vite.config.js           # Vite configuration
├── .gitignore               # Git ignore rules
│
└── src/
    ├── main.jsx             # React DOM render
    ├── App.jsx              # Main app component & state
    ├── App.css              # All styles (400+ lines)
    ├── imageData.js         # Sample image data with categories
    │
    └── components/
        ├── ImageGallery.jsx      # Grid gallery component
        ├── CategoryFilter.jsx     # Filter buttons component
        └── Lightbox.jsx          # Modal lightbox component
```

## 🚀 Quick Start

### Installation
```bash
cd "c:\Users\HP\Desktop\Internship Tasks\CodeAlpha Tasks\Task 1"
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```bash
npm run build
```

## 💡 Usage

### Filtering Images
Click any category button (All, Nature, Travel, Portraits) to filter the gallery.

### Viewing Full Size
Click any thumbnail to open it in the lightbox modal.

### Navigation
- **Mouse:** Use ❮ ❯ buttons to navigate between images
- **Keyboard:** 
  - `←` (Left Arrow) - Previous image
  - `→` (Right Arrow) - Next image  
  - `Esc` - Close lightbox
  - `Enter` / `Space` - Open selected image

### Mobile
The gallery is fully responsive and works great on mobile devices with touch support.

## 🎨 Customization

### Change Colors
Edit CSS variables in `src/App.css` `:root` section:
```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --dark-bg: #0f172a;
  /* ... more colors ... */
}
```

### Add More Images
Edit `src/imageData.js` and add to the `galleryData` array:
```javascript
{
  id: 13,
  src: 'image-url-or-data-uri',
  alt: 'Description',
  title: 'Image Title',
  category: 'Category Name'
}
```

### Change Grid Columns
In `src/App.css`, adjust the `grid-template-columns` in `.gallery-grid`:
```css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
```

## 📊 Image Categories

The gallery currently includes 12 sample images organized in 4 categories:

- **Nature** (4 images) - Mountain Peak, Forest Trail, Flowing Water, Desert Dunes
- **Travel** (4 images) - Sunset Beach, City Lights, Street Scene, Tropical Paradise
- **Portraits** (4 images) - Portrait Study, Natural Light, Close-up, Studio Portrait

## 🔧 Technologies Used

- **React 18.2.0** - UI framework with Hooks
- **Vite 5.0.8** - Fast build tool and dev server
- **CSS3** - Modern styling with Grid, Flexbox, Variables, Animations
- **JavaScript ES6+** - Modern JavaScript syntax

## 📱 Responsive Breakpoints

- **Mobile** (< 640px) - 1 column grid
- **Tablet** (640px - 1023px) - 2-3 column grid
- **Desktop** (1024px - 1439px) - 3-4 column grid
- **Large Desktop** (1440px+) - 4+ column grid

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible styles
- Color contrast compliance
- Reduced motion media query support

## 🎓 Learning Outcomes

This project demonstrates:
- React hooks and state management
- Component composition and reusability
- CSS Grid and Flexbox layouts
- Responsive design principles
- CSS variables for maintainability
- Keyboard accessibility
- Modern JavaScript practices

## 📝 Notes

- Uses SVG placeholder images (data URIs) to avoid external API dependencies
- Frontend-only implementation with no backend/database
- All data is stored in component state
- Perfect for learning React and modern web development

## 🚀 Next Steps (Enhancement Ideas)

- Replace SVG placeholders with real images
- Add image lazy loading
- Implement search functionality
- Add favorites/bookmarks feature
- Integrate with an image API (Unsplash, Pexels, etc.)
- Add image download functionality
- Implement image sharing buttons
- Add animations library (Framer Motion)
- Create backend API for persistent storage

## 📄 License

This is a learning project for CodeAlpha Frontend Web Development Internship.

---

**Built with ❤️ for CodeAlpha Internship**
