export default function Features() {
  const features = [
    {
      title: "Calidad Garantizada",
      desc: "Ofrecemos productos con los más altos estándares.",
    },
    {
      title: "Atención Personalizada",
      desc: "Nuestro equipo está listo para ayudarte.",
    },
    {
      title: "Envíos Rápidos",
      desc: "Llegamos a donde estés en tiempo récord.",
    },
    {
      title: "Innovación Constante",
      desc: "Siempre buscamos nuevas soluciones.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a
            href="#contacto"
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700"
          >
            Contáctanos Ahora
          </a>
        </div>
      </div>
    </section>
  );
}
