import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Check } from 'lucide-react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    { value: '1985', label: 'Ano de Fundação', highlight: false },
    { value: '40+', label: 'Anos de Experiência', highlight: false },
    { value: '100%', label: 'Dedicação ao Cliente', highlight: false },
    { value: null, label: 'Obras Públicas e Particulares', highlight: true, icon: Check },
  ]

  const features = [
    'Experiência de mais de 40 anos no setor',
    'Habilitados para obras públicas e particulares',
    'Primamos pela qualidade em todos os trabalhos',
    'Soluções personalizadas para cada cliente',
  ]

  return (
    <section id="sobre" className="about" ref={ref}>
      <div className="container">
        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="about-label">Sobre Nós</span>
            <h2 className="about-title">Tradição e Qualidade</h2>

            <p>
              A Construções J. F. Duarte é uma empresa do ramo da Construção Civil que, apesar de ainda jovem, a sua história remonta à década de 80. Em 1985, nasceu a Construções Duarte que foi fundada pelo pai do atual sócio-gerente da Construções J. F. Duarte, Jorge Duarte. Contamos, por isso com uma vasta experiência adquirida ao longo de mais de 40 anos.
            </p>
            <p>
              A Construções J. F. Duarte dedica-se a todo o tipo de trabalhos de construção civil, nomeadamente, novas construções, restauros, acabamentos interiores e exteriores. Estamos habilitados para a execução de obras públicas e particulares.

              Temos como objetivo encontrar sempre a melhor solução possível para cada caso, tendo em conta as necessidades e os sonhos dos nossos clientes, primando sempre pela qualidade dos nossos trabalhos.
            </p>

            <ul className="about-features">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle2 size={20} className="feature-icon" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`stat-card ${stat.highlight ? 'stat-card-highlight' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                {stat.icon ? (
                  <stat.icon className="stat-icon-check" size={40} />
                ) : (
                  <span className="stat-value">{stat.value}</span>
                )}
                <p className="stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

