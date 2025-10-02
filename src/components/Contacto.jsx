import { FaWhatsapp, FaPhone, FaMapPin } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { useState, useEffect, useRef } from "react";

export default function Contacto({ phoneNumber, message }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const formRef = useRef(null);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = formRef.current;

    // Creamos FormData incluyendo los campos ocultos que CF7 necesita
    const formData = new FormData(form);

    try {
      const res = await fetch(
        "https://panel.hegoval.cl/wp-json/contact-form-7/v1/contact-forms/59/feedback",
        {
          method: "POST",
          body: formData,
          headers: {
            // CF7 no necesita content-type manual, FormData lo hace automáticamente
          },
        }
      );

      const result = await res.json();

      if (result.status === "mail_sent") {
        showToast("✅ Mensaje enviado correctamente", "success");
        form.reset();
      } else if (result.status === "validation_failed") {
        showToast(
          "❌ Uno o más campos tienen un error. Por favor, revisa los datos.",
          "error"
        );
      } else {
        console.error(result);
        showToast(
          "❌ Error al enviar el mensaje. Intenta nuevamente.",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      showToast("❌ Error de conexión. Intenta nuevamente.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="relative overflow-x-hidden py-16 mt-2">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-400">
          Contacto
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 pt-4">
          {/* Formulario */}
          <div className="flex-1 p-6">
            <form
              ref={formRef}
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {/* Campos ocultos que CF7 necesita */}
              <input type="hidden" name="_wpcf7" value="59" />
              <input type="hidden" name="_wpcf7_version" value="5.8" />
              <input type="hidden" name="_wpcf7_locale" value="es_ES" />
              <input
                type="hidden"
                name="_wpcf7_unit_tag"
                value="wpcf7-f59-p123-o1"
              />
              <input type="hidden" name="_wpcf7_container_post" value="59" />

              <label className="font-semibold">Nombre</label>
              <input
                type="text"
                name="your-name"
                placeholder="Tu nombre"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="font-semibold">Email</label>
              <input
                type="email"
                name="your-email"
                placeholder="tuemail@dominio.com"
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="font-semibold">Mensaje</label>
              <textarea
                name="your-message"
                placeholder="Escribe tu mensaje..."
                rows={5}
                required
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>

          {/* Información y mapa */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full h-64 lg:h-full overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.689177245651!2d-70.69538776844601!3d-33.45179907732502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c46038b991ef%3A0xb80d9d4ba6d650e6!2sSan%20Gumercindo%2035%2C%209170255%20Santiago%2C%20Estaci%C3%B3n%20Central%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1759416245731!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Datos de contacto */}
        <div className="p-4 mt-2">
          <h3 className="font-semibold text-lg mb-2">Contáctanos</h3>
          <div className="md:flex pt-2 flex-wrap gap-2">
            <span className="flex mx-2 mb-4 md:mb-0 items-center">
              <FaPhone className="h-5 w-5 mx-2" /> Teléfono:
              <a className="ml-1" href="tel:+56227791349">
                +56227791349
              </a>
            </span>

            <span className="flex mx-2 mb-4 md:mb-0 items-center">
              <MdMailOutline className="h-6 w-6 mx-2" /> Email:
              <a className="ml-1" href="mailto:hegoval@hegoval.cl">
                hegoval@hegoval.cl
              </a>
            </span>

            <span className="flex mx-2 mb-4 md:mb-0 items-center">
              <FaWhatsapp className=" h-6 w-6 mx-2" />
              <a className="cursor-pointer" onClick={handleWhatsAppClick}>
                WhatsApp: +{phoneNumber}
              </a>
            </span>

            <span className="flex mx-2 items-center">
              <FaMapPin className="mx-2 w-5 h-5" /> Dirección: San Gumercindo
              35, Estación Central, Santiago, Chile
            </span>
          </div>
        </div>

        {/* Toast */}
        {toast.message && (
          <div
            className={`fixed bottom-8 right-8 px-6 py-4 rounded shadow-lg text-white font-semibold transition-transform transform ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } animate-slide-in`}
            style={{ zIndex: 9999 }}
          >
            {toast.message}
          </div>
        )}
      </div>
    </section>
  );
}
