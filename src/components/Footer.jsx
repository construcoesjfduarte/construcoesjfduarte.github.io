import { Facebook, Phone, Mail, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Construções J.F. Duarte</h3>
            <p>
              Mais de 30 anos de experiência em construção civil,
              primando sempre pela qualidade e satisfação dos nossos clientes.
            </p>
          </div>

          <div className="footer-links">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#inicio">Início</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#portefolio">Portfólio</a></li>
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
                href="https://www.facebook.com/profile.php?id=100011008272418"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={24} />
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

