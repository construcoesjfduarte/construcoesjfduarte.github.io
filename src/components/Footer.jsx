import { Phone, Mail, MapPin } from 'lucide-react'
import './Footer.css'

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 11v2.4h3.97c-.16 1.03-1.2 3.02-3.97 3.02-2.39 0-4.34-1.98-4.34-4.42S9.61 7.58 12 7.58c1.36 0 2.27.58 2.79 1.08l1.9-1.83C15.47 5.69 13.89 5 12 5c-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.72-2.84 6.72-6.84 0-.46-.05-.81-.11-1.16H12z"/>
  </svg>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Construções J.F. Duarte</h3>
            <p>
              Mais de 40 anos de experiência em construção civil,
              primando sempre pela qualidade e satisfação dos nossos clientes.
            </p>
          </div>

          <div className="footer-links">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#portefolio">Portefólio</a></li>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#contactos">Contactos</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contactos</h4>
            <ul>
              <li>
                <Phone size={16} />
                <a href="tel:916098887">916 098 887</a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:construcoesduart@gmail.com">construcoesduart@gmail.com</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>Braga, Portugal</span>
              </li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Redes Sociais</h4>
            <div className="social-links">
              <a
                href="https://maps.app.goo.gl/1hHyQJbq944E7kLb6"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
              >
                <GoogleIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} Construções J.F. Duarte. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

