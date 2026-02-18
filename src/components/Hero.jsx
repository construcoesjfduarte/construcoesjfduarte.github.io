import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="inicio" className="hero">
      <div
        className="hero-background"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Construções
            <span className="hero-title-highlight">J.F. Duarte</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Mais de 40 anos de excelência em construção civil
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <a href="#portefolio" className="btn btn-primary">
              Ver Portefólio
            </a>
            <a href="#contactos" className="btn btn-secondary">
              Contactar
            </a>
          </motion.div>
        </motion.div>
      </div>
      <motion.a
        href="#servicos"
        className="scroll-indicator"
        aria-label="Scroll para a secção de serviços"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <ChevronDown size={32} aria-hidden="true" />
      </motion.a>
    </section>
  )
}

export default Hero
