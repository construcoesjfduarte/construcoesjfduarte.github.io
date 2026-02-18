import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Building, History, Paintbrush, Droplets, Home, Mountain } from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: Building,
    title: 'Novas Construções',
    description: 'Construção de raiz de edifícios residenciais, comerciais e industriais com materiais de qualidade superior.'
  },
  {
    icon: History,
    title: 'Restauros',
    description: 'Recuperação e restauro de edifícios, preservando a identidade original com técnicas modernas.'
  },
  {
    icon: Paintbrush,
    title: 'Acabamentos',
    description: 'Acabamentos interiores e exteriores de excelência, incluindo revestimentos cerâmicos e pintura.'
  },
  {
    icon: Droplets,
    title: 'Impermeabilizações e Isolamentos',
    description: 'Soluções de impermeabilização e isolamento térmico para proteção duradoura da sua construção.'
  },
  {
    icon: Home,
    title: 'Isolamento de Fachadas',
    description: 'Aplicação de capoto e sistemas de isolamento exterior para eficiência energética e conforto.'
  },
  {
    icon: Mountain,
    title: 'Trabalhos em Pedra',
    description: 'Trabalhos especializados em pedra natural, valorizando a tradição e a beleza dos materiais nobres.'
  }
]

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicos" className="services" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Serviços</span>
          <h2 className="section-title">O Que Fazemos</h2>
          <p className="section-subtitle">
            Soluções completas em construção civil
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="service-icon">
                <service.icon size={32} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
