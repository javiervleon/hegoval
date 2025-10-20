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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Máximo de productos por página

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

  // --- PAGINACIÓN ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts
    .filter((p) => p.categoryId === selectedCategory)
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(
    filteredProducts.filter((p) => p.categoryId === selectedCategory).length /
      productsPerPage
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductInteraction = (productId, event) => {
    event.stopPropagation();
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      setActiveTooltip(activeTooltip === productId ? null : productId);
    }
  };

  const handleMouseEnter = (productId) => {
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

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

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
          <div className="flex flex-wrap justify-center gap-12">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                id={`category-${cat.id}`}
                className="flex flex-col items-center gap-3"
              >
                <div
                  onClick={() => setSelectedCategory(cat.id)}
                  className="relative cursor-pointer transition-transform transform hover:scale-105"
                  style={{ width: 180, height: 180 }}
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

            <button
              onClick={() => setSelectedCategory(null)}
              className=" hover:text-gray-300 transition"
            >
              ← Volver a Categorías
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((prod) => (
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
              ))}
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
