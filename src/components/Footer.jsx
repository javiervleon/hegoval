import { FaWhatsapp, FaPhone, FaMapPin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 w-full">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Información de la empresa */}
        <div>
          <h3 className="font-bold text-lg mb-4">Nuestra Empresa</h3>
          <p>Somos una empresa dedicada a brindar soluciones innovadoras.</p>
          <div>
            <div>
              <span className="flex mx-2">
                <FaPhone className="h-5 w-5 mx-2" /> Teléfono:
                <a href="tel:+56912345678"> +56 9 1234 5678</a>
              </span>
              <span className="flex mx-2">
                <MdMailOutline className="h-6 w-6 mx-2" /> Email:{" "}
                <a href="mailto:mail@empresa.com">info@empresa.com</a>
              </span>
              <span className="flex mx-2">
                <FaWhatsapp className="h-6 w-6 mx-2" /> WhatsApp: +56 9 1234
                5678{" "}
              </span>

              <span className="flex mx-2">
                <FaMapPin className="mx-2 w-5 h-5" /> Dirección: Calle Falsa
                123, Ciudad, País
              </span>
            </div>
          </div>
        </div>

        {/* Links útiles */}
        <div>
          <h3 className="font-bold text-lg mb-4">Links útiles</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="#home" className="hover:text-white transition">
                Inicio
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition">
                Quienes Somos
              </a>
            </li>
            <li>
              <a href="#productos" className="hover:text-white transition">
                Productos
              </a>
            </li>
            <li>
              <a href="#clientes" className="hover:text-white transition">
                Clientes
              </a>
            </li>
            <li>
              <a href="#contacto" className="hover:text-white transition">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="font-bold text-lg mb-4">Síguenos</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-white transition"
            >
              📘
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-white transition"
            >
              🐦
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white transition"
            >
              📸
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-white transition"
            >
              🔗
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Hegoval - Artículos Publicitarios. Todos
        los derechos reservados.
      </div>
    </footer>
  );
}
