import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Header({
  categories,
  products,
  sections,
  onSearch,
  onSelect,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Detectar scroll y tamaño de pantalla
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const normalizeText = (text) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  // Actualiza resultados mientras el usuario escribe
  useEffect(() => {
    if (!query) {
      setResults([]);
      onSearch("");
      return;
    }

    const matchedCategories = categories
      .filter((c) => normalizeText(c.name).includes(normalizeText(query)))
      .map((c) => ({ type: "category", ...c }));

    const matchedProducts = products
      .filter((p) => normalizeText(p.name).includes(normalizeText(query)))
      .map((p) => ({ type: "product", ...p }));

    const matchedSections = sections
      .filter(
        (s) =>
          normalizeText(s.name).includes(normalizeText(query)) ||
          normalizeText(s.content).includes(normalizeText(query))
      )
      .map((s) => ({ type: "section", ...s }));

    setResults([...matchedCategories, ...matchedProducts, ...matchedSections]);
    onSearch(query);
  }, [query, categories, products, sections, onSearch]);

  const handleSelect = (item) => {
    if (onSelect) onSelect(item); // Esto actualiza el estado en Landing.jsx

    setQuery("");
    setResults([]);

    let elementId = "productos"; // default
    if (item.type === "section") elementId = item.id;
    if (item.type === "category") elementId = `category-${item.id}`;
    if (item.type === "product") elementId = `category-${item.categoryId}`;

    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full z-50 relative">
      {/* Barra superior */}
      <div className="fixed top-0 left-0 w-full z-50 bg-gray-200 shadow">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 relative">
          {/* Buscador */}
          <div className="flex flex-col relative w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar productos, categorías o secciones..."
                className="w-full md:w-64 lg:w-80 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {results.length > 0 && (
              <ul className="absolute top-full left-0 w-full md:w-64 lg:w-80 bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto shadow-lg z-50">
                {results.map((item) => (
                  <li
                    key={`${item.type}-${item.id}`}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelect(item)}
                  >
                    {item.type === "category"
                      ? "📁 "
                      : item.type === "product"
                      ? "📦 "
                      : "📌 "}
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Iconos de contacto */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+56912345678"
              className="text-gray-600 hover:text-blue-600"
            >
              📞
            </a>
            <a
              href="mailto:info@empresa.com"
              className="text-gray-600 hover:text-blue-600"
            >
              ✉️
            </a>
            <a
              href="https://wa.me/56912345678"
              target="_blank"
              className="text-gray-600 hover:text-green-600"
            >
              💬
            </a>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="pt-16 bg-white shadow-sm">
        <div className="container mx-auto flex justify-center py-4">
          <img src="/logo.png" alt="Logo Empresa" className="h-16 md:h-20" />
        </div>
      </div>

      {/* Menú horizontal desktop */}
      <nav
        className={`hidden md:flex bg-gray-200 shadow-md transition-all duration-300 ${
          scrolled ? "hidden" : "flex"
        }`}
      >
        <div className="container mx-auto flex justify-center gap-6 py-3">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-blue-600"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-blue-600"
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToSection("productos")}
            className="hover:text-blue-600"
          >
            Productos
          </button>
          <button
            onClick={() => scrollToSection("clientes")}
            className="hover:text-blue-600"
          >
            Clientes
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="hover:text-blue-600"
          >
            Contacto
          </button>
        </div>
      </nav>

      {/* Botón flotante */}
      {typeof window !== "undefined" && (
        <>
          {isMobile && (
            <button
              className="fixed top-4 right-4 p-4 rounded-full bg-blue-600 text-white shadow-lg z-50 md:hidden transition-transform duration-300 hover:scale-110"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
          {!isMobile && scrolled && (
            <button
              className="fixed top-4 right-4 p-4 rounded-full bg-blue-600 text-white shadow-lg z-50 hidden md:flex transition-transform duration-300 hover:scale-110"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          )}
        </>
      )}

      {/* Menú vertical desplegable */}
      {menuOpen && (
        <div className="fixed top-16 right-0 w-full md:w-64 bg-white shadow-lg flex flex-col gap-4 p-6 z-40 transition-transform duration-300 transform translate-x-0">
          <button
            onClick={() => {
              scrollToSection("home");
              setMenuOpen(false);
            }}
          >
            Inicio
          </button>
          <button
            onClick={() => {
              scrollToSection("about");
              setMenuOpen(false);
            }}
          >
            Nosotros
          </button>
          <button
            onClick={() => {
              scrollToSection("productos");
              setMenuOpen(false);
            }}
          >
            Productos
          </button>
          <button
            onClick={() => {
              scrollToSection("clientes");
              setMenuOpen(false);
            }}
          >
            Clientes
          </button>
          <button
            onClick={() => {
              scrollToSection("contacto");
              setMenuOpen(false);
            }}
          >
            Contacto
          </button>
        </div>
      )}
    </header>
  );
}
