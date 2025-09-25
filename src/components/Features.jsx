export default function Features() {
  const features = [
    {
      title: "Más de 30 años en el mercado",
    },
    {
      title: "Rapidez en tiempos de entrega",
    },
    {
      title: "Excelente relación precio calidad",
    },
    {
      title: "Cercanos y confiables",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-400">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl mx-auto text-gray-900">
          Somos un aliado estratégico para fortalecer tu marca.
        </p>
        <div className="flex justify-center mt-12 relative z-10">
          <a
            href="#contacto"
            className="w-66 py-3 bg-black text-amber-300 text-lg font-semibold rounded-4xl hover:bg-gray-900 border-3 border-amber-300"
          >
            Cotiza con nosotros
          </a>
        </div>
      </div>
    </section>
  );
}
