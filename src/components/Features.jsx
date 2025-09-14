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
        <h2 className="text-3xl font-bold mb-12 text-gray-400">
          ¿Por qué elegirnos?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl mx-auto text-gray-900">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus debitis
          corrupti eius quos modi dignissimos ducimus sit incidunt magnam
          sapiente doloremque itaque voluptatem eveniet, exercitationem dolores
          nulla fuga mollitia beatae eum rerum aperiam. Accusamus incidunt
          recusandae enim dolores, accusantium ea optio modi consequuntur rerum
          corporis odit quibusdam quidem voluptates omnis.
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
