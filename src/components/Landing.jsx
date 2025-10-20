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
import Instagram from "./Instagram.jsx";

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

  // Estado para el número de WhatsApp
  const [whatsappConfig, setWhatsappConfig] = useState({
    phoneNumber: "",
    message: "",
  });

  // Cargar configuración de WhatsApp desde WP
  useEffect(() => {
    fetch("https://panel.hegoval.cl/wp-json/wp/v2/whatsapp")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setWhatsappConfig({
            phoneNumber: data[0].acf?.numero ?? "",
            message:
              data[0].acf?.mensaje ??
              "¡Hola! Me interesa obtener más información sobre sus productos.",
          });
        }
      })
      .catch((err) => console.error("Error cargando configuración:", err));
  }, []);

  // Cargar categorías desde WP
  useEffect(() => {
    fetch("https://panel.hegoval.cl/wp-json/wp/v2/categoria")
      .then((res) => res.json())
      .then((data) => {
        const cats = data
          .slice() // copiamos para no mutar
          .reverse() // invertimos orden
          .map((c) => ({
            id: c.id,
            name: c.acf?.nombre ?? c.title.rendered,
            img: c.acf?.imagen ?? "",
          }));
        setCategories(cats);
      });
  }, []);

  // Cargar productos desde WP
  useEffect(() => {
    fetch("https://panel.hegoval.cl/wp-json/wp/v2/producto?per_page=100")
      .then((res) => res.json())
      .then((data) => {
        const prods = data
          .slice()
          .reverse()
          .map((p) => ({
            id: p.id,
            name: p.acf?.nombre ?? p.title.rendered,
            categoryId: p.acf?.categoria?.ID ?? null,
            img: p.acf?.imagen ?? "",
            descripcion: p.acf?.descripcion ?? "",
          }));
        setProducts(prods);
      });
  }, []);

  return (
    <>
      <Header
        client:load
        phoneNumber={whatsappConfig.phoneNumber}
        message={whatsappConfig.message}
        categories={categories}
        products={products}
        sections={sectionsData}
        onSearch={setSearchQuery}
        onSelect={setSelectedSearchItem}
      />

      <main className="pt-4 sm:pt-14">
        <HeroSlider client:load />
        <Features
          client:load
          phoneNumber={whatsappConfig.phoneNumber}
          message={whatsappConfig.message}
        />
        <SectionDivider />
        <QuienesSomos
          client:load
          phoneNumber={whatsappConfig.phoneNumber}
          message={whatsappConfig.message}
        />
        <SectionDivider />
        <Productos
          categories={categories}
          products={products}
          searchQuery={searchQuery}
          selectedSearchItem={selectedSearchItem}
          phoneNumber={whatsappConfig.phoneNumber}
          message={whatsappConfig.message}
        />
        <SectionDivider />
        <Clientes
          phoneNumber={whatsappConfig.phoneNumber}
          message={whatsappConfig.message}
        />
        <SectionDivider />
        <Contacto
          client:load
          phoneNumber={whatsappConfig.phoneNumber}
          message={whatsappConfig.message}
        />
        <SectionDivider />
        <Instagram client:load />
      </main>

      <Footer
        phoneNumber={whatsappConfig.phoneNumber}
        message={whatsappConfig.message}
        client:load
      />

      {/* Botón flotante WhatsApp */}
      <WhatsAppButton
        phoneNumber={whatsappConfig.phoneNumber}
        message={whatsappConfig.message}
        client:load
      />
    </>
  );
}
