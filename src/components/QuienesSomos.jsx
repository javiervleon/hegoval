import { motion } from "framer-motion";

export default function QuienesSomos() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        {/* Imagen cuadrada */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src="/quienes-somos.jpg"
            alt="Quienes somos"
            className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Texto */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Quiénes Somos
          </h2>
          <p className="text-gray-600 text-lg md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex est, cum
            sed rem quae dolorem dolore veritatis cumque accusantium, qui magni
            praesentium voluptates temporibus soluta, natus enim accusamus
            aliquam quidem quisquam repellat sapiente consectetur ab. Maxime
            reprehenderit explicabo adipisci, suscipit aut doloremque sequi
            enim, inventore delectus, animi quia! Odit quos hic vel sapiente
            repudiandae. Exercitationem voluptatibus ex cumque sint. Consequatur
            unde provident explicabo nihil molestias ducimus similique
            architecto nulla assumenda cumque dolorem, tempora, eius quaerat.
            Consequatur debitis doloribus, ducimus veniam consequuntur sapiente
            dolorem aut est placeat. Ex aut placeat minus pariatur, commodi
            enim, quasi quam dolorum facilis quae quos eligendi!
          </p>
        </motion.div>
      </div>

      {/* Botón CTA centrado */}
      <motion.div
        className="flex justify-center mt-8"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
          Contáctanos
        </button>
      </motion.div>
    </section>
  );
}
