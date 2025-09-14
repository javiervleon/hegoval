import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import QuienesSomos from "../components/QuienesSomos.jsx";
import Productos from "../components/Productos.jsx";
import Contacto from "./Contacto.jsx";
import Footer from "./Footer.jsx";
import Clientes from "./Clientes.jsx";
import Features from "./Features.jsx";
import WhatsAppButton from "./WhatsappButton.jsx";
import SectionDivider from "./SectionDivider.jsx";

const sectionsData = [
  { id: "home", name: "Inicio", content: "Bienvenido a nuestra empresa..." },
  {
    id: "about",
    name: "Quienes Somos",
    content: "Somos una empresa dedicada...",
  },
  {
    id: "contacto",
    name: "Contacto",
    content: "Teléfono, email y WhatsApp...",
  },
  { id: "productos", name: "Productos", content: "Nuestros productos..." },
  {
    id: "clientes",
    name: "Clientes",
    content: "Algunos de nuestros clientes...",
  },
];

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchItem, setSelectedSearchItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Cargar categorías desde la REST API
  useEffect(() => {
    fetch("http://localhost:8881/wp-json/wp/v2/categoria")
      .then((res) => res.json())
      .then((data) => {
        const cats = data.map((c) => ({
          id: c.id,
          name: c.acf?.nombre ?? c.title.rendered,
          img: c.acf?.imagen ?? "",
        }));
        setCategories(cats);
      });
  }, []);

  // Cargar productos desde la REST API
  // En tu Landing.jsx, modifica el useEffect así:
  useEffect(() => {
    fetch("http://localhost:8881/wp-json/wp/v2/producto")
      .then((res) => res.json())
      .then((data) => {
        // DEBUG: Ver qué llega de la API
        console.log("=== DATOS DE LA API ===");
        console.log("Primer producto completo:", data[0]);
        console.log("data[0].acf:", data[0].acf);
        console.log("data[0].acf.descripcion:", data[0].acf?.descripcion);
        console.log("========================");

        const prods = data.map((p) => ({
          id: p.id,
          name: p.acf?.nombre ?? p.title.rendered,
          categoryId: p.acf?.categoria?.ID ?? null,
          img: p.acf?.imagen ?? "",
          descripcion: p.acf?.descripcion ?? "", // Agregar esta línea
        }));

        // DEBUG: Ver el producto transformado
        console.log("Producto transformado:", prods[0]);

        setProducts(prods);
      });
  }, []);

  return (
    <>
      <Header
        categories={categories}
        products={products}
        sections={sectionsData}
        onSearch={setSearchQuery}
        onSelect={setSelectedSearchItem}
      />

      <main className="pt-4 sm:pt-14">
        <HeroSlider client:load />
        <Features client:load />
        <SectionDivider />
        <QuienesSomos client:load />
        <SectionDivider />
        <Productos
          categories={categories}
          products={products}
          searchQuery={searchQuery}
          selectedSearchItem={selectedSearchItem}
        />
        <SectionDivider />
        <Clientes />
        <SectionDivider />
        <Contacto client:load />
      </main>

      <Footer />

      <WhatsAppButton
        phoneNumber="56912345678"
        message="¡Hola! Me interesa obtener más información sobre sus productos."
        client:load
      />
    </>
  );
}
