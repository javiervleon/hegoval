import { useState } from "react";
import Header from "../components/Header.jsx";
import HeroSlider from "../components/HeroSlider.jsx";
import QuienesSomos from "../components/QuienesSomos.jsx";
import Productos from "../components/Productos.jsx";
import Contacto from "./Contacto.jsx";
import Footer from "./Footer.jsx";
import Clientes from "./Clientes.jsx";
import Features from "./Features.jsx";

// Datos de ejemplo
const categoriesData = [
  { id: 1, name: "Categoría 1", img: "/cat1.jpg" },
  { id: 2, name: "Categoría 2", img: "/cat2.jpg" },
  { id: 3, name: "Categoría 3", img: "/cat3.jpg" },
  { id: 4, name: "Categoría 4", img: "/cat4.jpg" },
];

const productsData = [
  { id: 1, name: "Producto 1A", img: "/prod1a.jpg", categoryId: 1 },
  { id: 2, name: "Producto 1B", img: "/prod1b.jpg", categoryId: 1 },
  { id: 3, name: "Producto 2A", img: "/prod2a.jpg", categoryId: 2 },
  { id: 4, name: "Producto 3A", img: "/prod3a.jpg", categoryId: 3 },
  { id: 5, name: "Producto 4A", img: "/prod4a.jpg", categoryId: 4 },
];

const sectionsData = [
  { id: "home", name: "Inicio", content: "Bienvenido a nuestra empresa..." },
  {
    id: "about",
    name: "Quiénes Somos",
    content: "Somos una empresa dedicada...",
  },
  {
    id: "contacto",
    name: "Contacto",
    content: "Teléfono, email y WhatsApp...",
  },
];

export default function Landing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <Header
        categories={categoriesData}
        products={productsData}
        sections={sectionsData}
        onSearch={setSearchQuery}
        onSelect={(item) => {
          if (item.type === "category") setSelectedCategory(item.id);
          if (item.type === "product") setSelectedCategory(item.categoryId);
          // para secciones no hace falta setSelectedCategory
          // solo scroll, que Header ya maneja
        }}
      />

      <main className="pt-16">
        <HeroSlider client:load />
        <Features client:load />
        <QuienesSomos client:load />
        <Productos
          categories={categoriesData}
          products={productsData}
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Clientes />
        <Contacto client:load />
      </main>
      <Footer />
    </>
  );
}
