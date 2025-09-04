import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef } from "react";

export default function HeroSlider() {
  const swiperRef = useRef(null);

  // Avanza al siguiente slide cuando termina el video
  const handleVideoEnded = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // Ejemplo de slides dinámicas (pueden venir de WordPress en el futuro)
  const slides = [
    {
      type: "video",
      src: "/video/banner.mp4",
      title: "Bienvenidos a Nuestra Empresa",
    },
    {
      type: "content",
      bgColor: "bg-blue-600",
      title: "¡Oferta especial!",
      subtitle: "Consulta nuestras promociones",
    },
    {
      type: "content",
      bgColor: "bg-green-600",
      title: "Nuevo Producto",
      subtitle: "Descubre lo último",
    },
  ];

  return (
    <section id="home" className="h-screen w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className="h-full"
      >
        {slides.map((slide, idx) => {
          if (slide.type === "video") {
            return (
              <SwiperSlide key={idx}>
                <div className="relative w-full h-full">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnded}
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
                      {slide.title}
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
            );
          } else {
            return (
              <SwiperSlide key={idx}>
                <div
                  className={`flex items-center justify-center h-full ${slide.bgColor}`}
                >
                  <div className="text-center px-4">
                    <h2 className="text-3xl md:text-5xl text-white font-bold mb-2">
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className="text-white text-lg md:text-2xl">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </section>
  );
}
