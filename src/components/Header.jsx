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
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Detectar scroll y tamaño de pantalla
  useEffect(() => {
    // Marcar que el componente está montado
    setMounted(true);

    const handleScroll = () => {
      // Múltiples formas de obtener scroll
      const scrollY1 = window.scrollY;
      const scrollY2 = window.pageYOffset;
      const scrollY3 = document.documentElement.scrollTop;
      const scrollY4 = document.body.scrollTop;

      const scrollY = scrollY1 || scrollY2 || scrollY3 || scrollY4;
      const shouldBeScrolled = scrollY > 150;

      setScrolled(shouldBeScrolled);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      setIsMobile(mobile);
    };

    // Ejecutar inmediatamente
    handleResize();
    handleScroll();

    // Agregar event listeners a múltiples elementos
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    document.body.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    // Test manual con diferentes métodos

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      document.body.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    if (onSelect) onSelect(item);

    setQuery("");
    setResults([]);

    if (item.type === "category") {
      setSelectedCategory(item.id);
      setSelectedProduct(null);
    } else if (item.type === "product") {
      setSelectedProduct(item.id);
      setSelectedCategory(item.categoryId);
    } else {
      // section
      setSelectedCategory(null);
      setSelectedProduct(null);
    }

    // Scroll a la sección de productos o a la sección específica
    let elementId = "productos";
    if (item.type === "section") elementId = item.id;

    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element)
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <header className="w-full z-50 relative">
      {/* Barra superior */}
      <div className="fixed top-0 left-0 w-full z-50 barraSuperior">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 relative">
          {/* Buscador */}
          <div className="flex flex-col relative w-full px-14 md:w-auto">
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-white" />
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

      {/* Logo con fondo decorativo */}
      <div className="pt-12 sm:pb-8 bg-white relative">
        {/* Imagen decorativa pegada abajo */}
        <div className="absolute top-10 sm:top-7 left-1/2 -translate-x-1/2 w-full flex justify-center">
          <img
            src="/decoheader.svg"
            alt="Decoración detrás del logo"
            className="w-full max-w-[1300px]"
          />
        </div>

        {/* Logo encima */}
        <div className="container mx-auto flex justify-center relative z-10">
          <img
            src="/logo.svg"
            alt="Logo Empresa"
            className="h-22 sm:h-48 my-16 sm:my-22"
          />
        </div>
      </div>

      {/* Menú horizontal desktop */}
      <nav
        className={`hidden md:flex relative transition-all duration-300 ${
          scrolled ? "hidden" : "flex"
        }`}
      >
        {/* Fondo con tramas y barra gris */}
        <div className="absolute inset-0 flex justify-center items-center h-15 z-0 overflow-hidden">
          {/* Contenedor de barra gris y tramas */}
          <div className="relative flex items-center h-1 w-260 mx-auto">
            {/* Barra gris */}
            <div className="absolute inset-0 bg-gray-200 h-2 w-full"></div>

            {/* Trama izquierda */}
            <img
              src="/trama.svg"
              alt="trama izquierda"
              className="absolute left-[-400px] top-1/2 -translate-y-1/2 h-[45px] object-cover"
            />

            {/* Trama derecha */}
            <img
              src="/trama.svg"
              alt="trama derecha"
              className="absolute right-[-400px] top-1/2 -translate-y-1/2 h-[45px] object-cover"
            />
          </div>
        </div>
        {/* Menú centrado */}
        <div className="container mx-auto flex justify-center gap-6 items-center h-14 relative z-10">
          <button
            onClick={() => scrollToSection("home")}
            className="transition-transform duration-300 hover:scale-105"
          >
            <img src="/inicio.svg" alt="Inicio" className="h-[55px]" />
          </button>

          <button
            onClick={() => scrollToSection("home")}
            className="transition-transform duration-300 hover:scale-105"
          >
            <img src="/nosotros.svg" alt="Nosotros" className="h-[55px]" />
          </button>

          <button
            onClick={() => scrollToSection("productos")}
            className="transition-transform duration-300 hover:scale-105"
          >
            <img src="/productos.svg" alt="Productos" className="h-[55px]" />
          </button>

          <button
            onClick={() => scrollToSection("clientes")}
            className="transition-transform duration-300 hover:scale-105"
          >
            <img src="/clientes.svg" alt="Clientes" className="h-[55px]" />
          </button>

          <button
            onClick={() => scrollToSection("contacto")}
            className="transition-transform duration-300 hover:scale-105"
          >
            <img src="/contacto.svg" alt="Contacto" className="h-[55px]" />
          </button>
        </div>
      </nav>

      {/* Botón flotante - Mobile (siempre visible) */}
      {mounted && isMobile && (
        <button
          className="fixed top-4 right-4 p-4 rounded-full botonMenu text-white shadow-lg z-50 transition-transform duration-300 hover:scale-110"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Botón flotante - Desktop (solo cuando hay scroll) */}
      {mounted && !isMobile && scrolled && (
        <button
          className="fixed top-4 right-4 p-4 rounded-full botonMenu text-white shadow-lg z-50 transition-transform duration-300 hover:scale-110"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Menú vertical desplegable */}
      {menuOpen && (
        <div className="fixed top-16 right-0 w-full md:w-64 bg-white shadow-lg flex flex-col z-40 transition-transform duration-300 transform translate-x-0">
          <button
            className="btnElement"
            onClick={() => {
              scrollToSection("home");
              setMenuOpen(false);
            }}
          >
            Inicio
          </button>
          <button
            className="btnElement"
            onClick={() => {
              scrollToSection("about");
              setMenuOpen(false);
            }}
          >
            Nosotros
          </button>
          <button
            className="btnElement"
            onClick={() => {
              scrollToSection("productos");
              setMenuOpen(false);
            }}
          >
            Productos
          </button>
          <button
            className="btnElement"
            onClick={() => {
              scrollToSection("clientes");
              setMenuOpen(false);
            }}
          >
            Clientes
          </button>
          <button
            className="btnElement"
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
