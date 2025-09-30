export default function Features() {
  const features = [
    {
      title: "Más de 30 años en el mercado",
      image: "/antiguedad.svg",
    },
    {
      title: "Rapidez en tiempos de entrega",
      image: "/rapidez.svg",
    },
    {
      title: "Excelente relación precio calidad",
      image: "/preciocalidad.svg",
    },
    {
      title: "Cercanos y confiables",
      image: "/confiables.svg",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-400">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white rounded-lg">
              <img
                src={f.image}
                alt={f.title}
                className="h-36 w-36 mx-auto mb-4"
              />
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
