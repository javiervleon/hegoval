import { FaWhatsapp, FaPhone, FaMapPin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";

export default function Contacto() {
  return (
    <section
      id="contacto"
      className="relative overflow-x-hidden py-16 mt-2 -z-10"
    >
      <img
        src="/bg-blue.svg"
        alt=""
        className="absolute top-0 left-2 md:left-12 w-24 md:w-32 pointer-events-none select-none"
      />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-400">
          Contacto
        </h2>
        <p className="text-center text-gray-900 mb-8">
          Grandes marcas y agencias han confiado en nosotros para innovar dentro
          del mundo publicitario. Confía tú también.
        </p>
        <div className="flex flex-col lg:flex-row gap-8 pt-4">
          {/* Formulario */}
          <div className="flex-1 p-6">
            <form className="flex flex-col gap-4">
              <label className="font-semibold">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="font-semibold">Email</label>
              <input
                type="email"
                placeholder="tuemail@dominio.com"
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="font-semibold">Mensaje</label>
              <textarea
                placeholder="Escribe tu mensaje..."
                rows={5}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Mapa e info */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full h-64 lg:h-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="p-4 mt-2">
          <h3 className="font-semibold text-lg mb-2">Contáctanos</h3>
          <div className="md:flex pt-2">
            <span className="flex mx-2 mb-4 md:mb-0">
              <FaPhone className="h-5 w-5 mx-2" /> Teléfono:
              <a className="ml-1" href="tel:+56912345678">
                {" "}
                +56 9 1234 5678
              </a>
            </span>
            <span className="flex mx-2 mb-4 md:mb-0">
              <MdMailOutline className="h-6 w-6 mx-2" /> Email:
              <a className="ml-1" href="mailto:info@empresa.com">
                info@empresa.com
              </a>
            </span>
            <span className="flex mx-2 mb-4 md:mb-0">
              <FaWhatsapp className="h-6 w-6 mx-2" />
              <a href="https://wa.me/56912345678"> WhatsApp: +56 9 1234 5678</a>
            </span>

            <span className="flex mx-2">
              <FaMapPin className="mx-2 w-5 h-5" /> Dirección: Calle Falsa 123,
              Ciudad, País
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
