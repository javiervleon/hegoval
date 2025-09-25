import { useState } from "react";

const clientesData = [
  {
    id: 1,
    logo: "/clientes/logo1.png",
    image: "/clientes/proyecto1.png",
    name: "Cliente 1",
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    logo: "/clientes/logo2.png",
    image: "/clientes/proyecto2.png",
    name: "Cliente 2",
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    logo: "/clientes/logo3.png",
    image: "/clientes/proyecto3.png",
    name: "Cliente 3",
    info: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export default function Clientes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const openModal = (client) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setModalOpen(false);
  };

  return (
    <section id="clientes" className="relative overflow-x-hidden py-16 mt-2">
      <img
        src="/bg-green.svg"
        alt=""
        className="absolute top-0 right-2 md:right-12 w-24 md:w-32 pointer-events-none select-none -z-10"
      />
      <div className="container mx-auto px-4">
        <h2 className="text-gray-400 text-3xl md:text-4xl font-bold text-center mb-4">
          Nuestros Clientes
        </h2>
        <p className="text-center text-gray-900 mb-8 pt-4">
          Grandes marcas y agencias han confiado en nosotros para innovar dentro
          del mundo publicitario. Confía tú también.
        </p>

        {/* Slider de logos centrado y con scroll-snap */}
        <div className="flex overflow-x-auto gap-6 py-4 justify-center scroll-pl-4 snap-x snap-mandatory scrollbar-hide">
          {clientesData.map((cliente) => (
            <div
              key={cliente.id}
              className="flex-shrink-0 w-32 h-32 bg-white shadow-lg rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform snap-center"
              onClick={() => openModal(cliente)}
            >
              <img
                src={cliente.logo}
                alt={cliente.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ))}
        </div>

        {/* Botón CTA debajo del slider */}
        <div className="flex flex-col items-center text-center mt-6">
          <button className="w-66 py-3 bg-black text-amber-300 text-lg font-semibold rounded-4xl hover:bg-gray-900 border-3 border-amber-300">
            ¡Cotiza con nosotros!
          </button>
        </div>

        {/* Modal */}
        {modalOpen && selectedClient && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Contenedor de imágenes */}
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                {/* Logo */}
                <div className="md:w-1/3 flex items-center justify-center">
                  <img
                    src={selectedClient.logo}
                    alt={selectedClient.name}
                    className="max-w-full max-h-32 object-contain"
                  />
                </div>

                {/* Imagen del proyecto */}
                <div className="md:w-2/3 flex items-center justify-center">
                  <img
                    src={selectedClient.image}
                    alt={`${selectedClient.name} proyecto`}
                    className="w-full h-48 object-cover rounded"
                  />
                </div>
              </div>

              {/* Texto centrado */}
              <p className="text-gray-700 text-center">{selectedClient.info}</p>

              {/* Botón CTA centrado */}
              <div className="flex justify-center">
                <button className="w-66 py-3 bg-black text-amber-300 text-lg font-semibold rounded-4xl hover:bg-gray-900 border-3 border-amber-300">
                  Tengo un proyecto en mente
                </button>
              </div>

              {/* Botón cerrar */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
                onClick={closeModal}
              >
                [x]
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
