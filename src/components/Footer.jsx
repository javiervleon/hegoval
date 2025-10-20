import { FaWhatsapp, FaPhone, FaMapPin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Footer({ phoneNumber, message }) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <footer className="bg-gray-800 text-gray-200 py-10 w-full">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Información de la empresa */}
        <div>
          <h3 className="font-bold text-lg mb-4">Nuestra Empresa</h3>
          <p className="mb-3">
            Somos una empresa dedicada a brindar soluciones innovadoras.
          </p>
          <div>
            <div>
              <span className="flex mx-2 mb-3">
                <FaPhone className="h-5 w-5 mx-2" /> Teléfono:
                <a className="ml-1" href="tel:+56227791349">
                  {" "}
                  +56227791349
                </a>
              </span>
              <span className="flex mx-2 mb-3">
                <MdMailOutline className="h-6 w-6 mx-2" /> Email:
                <a className="ml-1" href="mailto:hegoval@hegoval.cl">
                  {" "}
                  hegoval@hegoval.cl
                </a>
              </span>
              <span className="flex mx-2 mb-3">
                <FaWhatsapp className="h-6 w-6 mx-2" /> WhatsApp:
                <a
                  className="ml-1 cursor-pointer"
                  onClick={handleWhatsAppClick}
                >
                  {" "}
                  +{phoneNumber}
                </a>
              </span>

              <span className="flex mx-2">
                <FaMapPin className="mx-2 w-5 h-5" /> Dirección: San Gumercindo
                35, Estación Central, Santiago, Chile
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
              href="https://instagram.com/hegoval_"
              target="_blank"
              className="hover:text-white transition"
            >
              📸
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
