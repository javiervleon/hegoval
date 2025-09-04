import { useState, useEffect } from "react";

export default function Productos({
  categories,
  products,
  searchQuery,
  selectedSearchItem,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Actualiza categoría si se selecciona desde búsqueda
  useEffect(() => {
    if (selectedSearchItem) {
      setSelectedCategory(
        selectedSearchItem.type === "category"
          ? selectedSearchItem.id
          : selectedSearchItem.categoryId
      );

      setTimeout(() => {
        const elementId =
          selectedSearchItem.type === "category"
            ? `category-${selectedSearchItem.id}`
            : `category-${selectedSearchItem.categoryId}`;
        const element = document.getElementById(elementId);
        if (element)
          element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [selectedSearchItem]);

  // Filtrar categorías y productos según searchQuery
  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredCategories = categories.filter((c) =>
    normalizeText(c.name).includes(normalizeText(searchQuery || ""))
  );

  const filteredProducts = products.filter(
    (p) =>
      normalizeText(p.name).includes(normalizeText(searchQuery || "")) &&
      (selectedCategory ? p.categoryId === selectedCategory : true)
  );

  return (
    <section id="productos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Nuestros Productos
        </h2>

        {/* Grilla categorías si no hay categoría seleccionada */}
        {!selectedCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                id={`category-${cat.id}`}
                className="cursor-pointer bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform"
                onClick={() => setSelectedCategory(cat.id)}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Productos */}
        {selectedCategory && (
          <div className="flex flex-col items-center gap-6">
            {/* Submenú categorías */}
            <div className="flex flex-wrap justify-center gap-4 mb-4 text-gray-700">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 border-b-2 transition ${
                    selectedCategory === cat.id
                      ? "border-blue-600 font-semibold"
                      : "border-transparent hover:border-gray-400"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Botón volver */}
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-4 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              ← Volver a Categorías
            </button>

            <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              {categories.find((c) => c.id === selectedCategory)?.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {filteredProducts
                .filter((p) => p.categoryId === selectedCategory)
                .map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform"
                  >
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 text-center">
                      <h4 className="font-semibold">{prod.name}</h4>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
