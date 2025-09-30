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
        className="absolute top-0 left-2 md:left-12 w-24 md:w-32 pointer-events-none select-none -z-10"
      />
      <div className="text-center container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-400">
          {!selectedCategory ? "Categorías de Productos" : "Productos"}
        </h2>
        <p className="text-lg text-gray-900 mt-6 mb-4 mx-auto max-w-3xl">
          Te invitamos a conocer nuestro trabajo.
        </p>

        {/* Categorías centradas con flex */}
        {!selectedCategory && (
          <div className="flex flex-wrap justify-center gap-6">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                id={`category-${cat.id}`}
                className="flex flex-col items-center gap-3"
              >
                <div
                  onClick={() => setSelectedCategory(cat.id)}
                  className="relative cursor-pointer transition-transform transform hover:scale-105"
                  style={{ width: 150, height: 150 }}
                  aria-hidden
                >
                  <div
                    className="absolute inset-2 overflow-hidden"
                    style={{ borderRadius: 8 }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className="text-sm font-semibold text-gray-700"
                >
                  {cat.name}
                </button>
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
                      className="relative group bg-white shadow-lg border-2 overflow-hidden cursor-pointer hover:scale-110 transition-transform"
                      onClick={(e) => handleProductInteraction(prod.id, e)}
                      onMouseEnter={() => handleMouseEnter(prod.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src={prod.imagen || prod.img}
                        alt={prod.nombre || prod.name}
                        className="w-60 h-60 object-cover"
                      />
                      <div className="p-4 text-center">
                        <h4 className="font-semibold">
                          {prod.nombre || prod.name}
                        </h4>
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
