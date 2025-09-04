export default function Contacto() {
  return (
    <section id="contacto" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Contacto
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Formulario */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
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
            <div className="w-full h-64 lg:h-full bg-gray-200 rounded-lg overflow-hidden">
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

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg mb-2">Contáctanos</h3>
              <p>📞 Teléfono: +56 9 1234 5678</p>
              <p>✉️ Email: info@empresa.com</p>
              <p>💬 WhatsApp: +56 9 1234 5678</p>
              <p>🏢 Dirección: Calle Falsa 123, Ciudad, País</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
