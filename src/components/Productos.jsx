import { useState, useEffect } from "react";

export default function Productos({
  categories,
  products,
  searchQuery,
  selectedSearchItem,
}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [activeTooltip, setActiveTooltip] = useState(null);

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

  // Cerrar tooltip al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeTooltip &&
        !event.target.closest(`[data-product-id="${activeTooltip}"]`)
      ) {
        setActiveTooltip(null);
      }
    };

    if (activeTooltip) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeTooltip]);

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

  const handleProductInteraction = (productId, event) => {
    event.stopPropagation();

    // Detectar si es un dispositivo táctil
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      // En dispositivos táctiles, alternar tooltip con tap
      setActiveTooltip(activeTooltip === productId ? null : productId);
    }
  };

  const handleMouseEnter = (productId) => {
    // Solo activar hover en dispositivos no táctiles
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      setHoveredProduct(productId);
    }
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  const isTooltipVisible = (productId) => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    return isTouchDevice
      ? activeTooltip === productId
      : hoveredProduct === productId;
  };

  return (
    <section id="productos" className="py-16 relative overflow-hidden mt-2">
      <img
        src="/bg-pink.svg"
        alt=""
        className="absolute top-0 left-12 w-24 md:w-32 pointer-events-none select-none"
      />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-400">
          {!selectedCategory ? "Categorías de Productos" : "Productos"}
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
              className=" hover:text-gray-300 transition"
            >
              ← Volver a Categorías
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts
                .filter((p) => p.categoryId === selectedCategory)
                .map((prod) => {
                  return (
                    <div
                      key={prod.id}
                      data-product-id={prod.id}
                      className="relative group bg-white shadow-lg border-2 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      onClick={(e) => handleProductInteraction(prod.id, e)}
                      onMouseEnter={() => handleMouseEnter(prod.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={prod.imagen || prod.img}
                        alt={prod.nombre || prod.name}
                        className="w-55 h-55 md:w-45 md:h-45 object-cover"
                      />
                      <div className="p-4 text-center">
                        <h4 className="font-semibold">
                          {prod.nombre || prod.name}
                        </h4>
                        {/* Debug: mostrar si hay descripción */}
                        <small className="text-gray-500">
                          {prod.descripcion || "Sin descripción"}
                        </small>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
