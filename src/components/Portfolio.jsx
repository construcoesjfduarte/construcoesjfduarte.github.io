import { useState, useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import './Portfolio.css'

// Import all portfolio images using Vite's glob
const imageModules = import.meta.glob('/public/portfolio/**/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  query: '?url',
  import: 'default'
})

const albumNames = [
  'Acabamentos',
  'Estruturas',
  'Impermeabilizações e Isolamentos',
  'Isolamento de Fachadas',
  'Outros Trabalhos',
  'Recuperação de Templos Religiosos',
  'Restauros',
  'Trabalhos em Pedra',
]

// Helper function to get the base name without extension
const getBaseName = (path) => {
  const fileName = path.split('/').pop()
  return fileName.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
}

const Portfolio = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentAlbum, setCurrentAlbum] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const albums = useMemo(() => {
    return albumNames.map(name => {
      // Group images by base name to handle WebP + original pairs
      const imagesByBaseName = {}

      Object.entries(imageModules).forEach(([path, url]) => {
        if (path.includes(`/portfolio/${name}/`)) {
          const baseName = getBaseName(path)
          const isWebp = path.endsWith('.webp')

          if (!imagesByBaseName[baseName]) {
            imagesByBaseName[baseName] = { webp: null, fallback: null, alt: name }
          }

          if (isWebp) {
            imagesByBaseName[baseName].webp = url
          } else {
            imagesByBaseName[baseName].fallback = url
          }
        }
      })

      // Create images array, prioritizing WebP
      const images = Object.values(imagesByBaseName).map(img => ({
        src: img.webp || img.fallback, // Prefer WebP
        fallback: img.fallback, // Keep fallback for browsers without WebP support
        alt: img.alt,
      }))

      return {
        id: name.toLowerCase().replace(/\s+/g, '-').replace(/[áàã]/g, 'a').replace(/[éê]/g, 'e').replace(/[í]/g, 'i').replace(/[óô]/g, 'o').replace(/[ú]/g, 'u').replace(/[ç]/g, 'c'),
        name,
        images,
      }
    }).filter(album => album.images.length > 0)
  }, [])

  const openLightbox = (album, index = 0) => {
    setCurrentAlbum(album)
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <section id="portefolio" className="portfolio" ref={ref}>
      <div className="container">
        <motion.div
          className="portfolio-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Portefólio</span>
          <h2 className="section-title">Os Nossos Trabalhos</h2>
        </motion.div>

        <div className="portfolio-grid">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              className="portfolio-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => openLightbox(album)}
            >
              <div className="portfolio-card-image">
                <picture>
                  {album.images[0]?.src?.endsWith('.webp') && (
                    <source srcSet={album.images[0].src} type="image/webp" />
                  )}
                  <img
                    src={album.images[0]?.fallback || album.images[0]?.src || '/placeholder.jpg'}
                    alt={album.name}
                    loading="lazy"
                  />
                </picture>
                <div className="portfolio-card-overlay">
                  <h3>{album.name}</h3>
                  <p>{album.images.length} {album.images.length === 1 ? 'foto' : 'fotos'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {currentAlbum && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={currentAlbum.images}
          index={currentIndex}
        />
      )}
    </section>
  )
}

export default Portfolio

