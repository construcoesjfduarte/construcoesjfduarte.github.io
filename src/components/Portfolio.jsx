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

const Portfolio = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentAlbum, setCurrentAlbum] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const albums = useMemo(() => {
    return albumNames.map(name => {
      const images = []

      Object.entries(imageModules).forEach(([path, url]) => {
        if (path.includes(`/portfolio/${name}/`)) {
          images.push({
            src: url,
            alt: name,
          })
        }
      })

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
          <span className="section-label">Portfólio</span>
          <h2 className="section-title">Os Nossos Trabalhos</h2>
          <p className="section-subtitle">
            Aqui ficam algumas amostras do trabalho desenvolvido
          </p>
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
                <img
                  src={album.images[0]?.src || '/placeholder.jpg'}
                  alt={album.name}
                  loading="lazy"
                />
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

