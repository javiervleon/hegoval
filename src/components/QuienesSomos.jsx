import { motion } from "framer-motion";

export default function QuienesSomos({ phoneNumber, message }) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
    <section id="about" className="py-16 relative overflow-hidden mt-2">
      {/* SVG de fondo en la esquina superior derecha */}
      <img
        src="/bg-qs.svg"
        alt=""
        className="absolute top-0 right-2 md:right-12 w-24 md:w-32 pointer-events-none select-none -z-10"
      />

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* Imagen cuadrada con decoración */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Contenedor con tamaño fijo para el SVG */}
          <div className="relative w-84 h-84 md:w-[21rem] md:h-[21rem] flex items-center justify-center">
            {/* SVG decorativo de fondo con tamaño fijo */}
            <img
              src="/deco-qs.svg"
              alt=""
              className="absolute inset-0 w-full h-full z-0 pointer-events-none object-contain"
            />

            {/* Imagen principal centrada */}
            <img
              src="/quienes-somos.jpg"
              alt="Quienes somos"
              className="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-xl z-10"
            />
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-400">
            Quienes Somos
          </h2>
          <p className="text-gray-900 text-lg md:text-base">
            Con más de 30 años en el mercado, nos hemos consolidado como un
            socio estratégico en artículos publicitarios. Nuestra fortaleza está
            en el equipo humano: personas comprometidas, capacitadas y
            detallistas que transforman tu proyecto o tu marca en un producto de
            calidad. La responsabilidad y puntualidad nos distinguen, cumpliendo
            siempre con los plazos de entrega. Somos, Hegoval.
          </p>
        </motion.div>
      </div>

      {/* Botón CTA centrado */}
      <motion.div
        className="flex flex-col items-center mt-8 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <button
          onClick={handleWhatsAppClick}
          className="cursor-pointer w-66 py-3 bg-black text-amber-300 text-lg font-semibold rounded-4xl hover:bg-gray-900 border-3 border-amber-300"
        >
          Quiero saber más
        </button>
      </motion.div>
    </section>
  );
}
