import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, Share2 } from 'lucide-react'

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
  </svg>
)

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 11v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42S9.61 7.58 12 7.58c1.36 0 2.27.58 2.79 1.08l1.9-1.83C15.47 5.69 13.89 5 12 5c-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H12z"/>
  </svg>
)
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const contactInfo = [
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
      icon: Share2,
      title: 'Redes Sociais',
      details: [{ label: '', value: 'Siga-nos nas redes sociais' }],
      socialLinks: [
        {
          icon: FacebookIcon,
          link: 'https://www.facebook.com/profile.php?id=100011008272418',
          label: 'Facebook',
        },
        {
          icon: GoogleIcon,
          link: 'https://maps.app.goo.gl/1hHyQJbq944E7kLb6',
          label: 'Google Maps',
        },
      ],
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
              {item.socialLinks && (
                <div className="social-links">
                  {item.socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact

