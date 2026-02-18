import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Facebook } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Morada',
      details: [
        { label: 'Sede', value: 'Braga, Braga, Portugal' },
        { label: 'Estaleiro', value: 'Panque, Barcelos, Braga, Portugal' },
      ],
    },
    {
      icon: Phone,
      title: 'Telemóvel',
      details: [{ label: '', value: '916 098 887' }],
      link: 'tel:916098887',
      linkText: 'Ligar agora',
    },
    {
      icon: Mail,
      title: 'Email',
      details: [{ label: '', value: 'construcoesduart@gmail.com' }],
      link: 'mailto:construcoesduart@gmail.com',
      linkText: 'Enviar email',
    },
    {
      icon: Facebook,
      title: 'Redes Sociais',
      details: [{ label: '', value: 'Siga-nos no Facebook' }],
      link: 'https://www.facebook.com/profile.php?id=100011008272418',
      linkText: 'Visitar página',
    },
  ]

  return (
    <section id="contactos" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contactos</span>
          <h2 className="section-title">Fale Connosco</h2>
          <p className="section-subtitle">
            Estamos disponíveis para esclarecer todas as suas dúvidas
          </p>
        </motion.div>

        <div className="contact-grid">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="contact-card-icon">
                <item.icon size={32} />
              </div>
              <h3 className="contact-card-title">{item.title}</h3>
              <div className="contact-card-details">
                {item.details.map((detail, idx) => (
                  <div key={idx} className="contact-detail">
                    {detail.label && <strong>{detail.label}:</strong>}
                    <span>{detail.value}</span>
                  </div>
                ))}
              </div>
              {item.link && (
                <a
                  href={item.link}
                  className="contact-card-link"
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {item.linkText}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact

