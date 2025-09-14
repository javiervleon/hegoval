import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useRef } from "react";

const ArrowPrev = () => (
  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ArrowNext = () => (
  <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export default function HeroSlider() {
  const swiperRef = useRef(null);

  const handleVideoEnded = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

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
    <section id="home" className="flex flex-col items-center">
      {/* Claim text y párrafo */}
      <div className="text-center mb-8 px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-400">
          CLAIM TEXT - CLAIM TEXT
        </h1>
        <p className="text-lg text-gray-900 font-medium mt-6 mb-4 mx-auto max-w-3xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia
          temporibus incidunt deserunt molestiae? Officia, sapiente quaerat
          neque vero eos in praesentium rem aliquam commodi optio aut.
          Laboriosam, minima quae?
        </p>
      </div>
      <div className="w-full max-w-5xl md:rounded-xl overflow-hidden shadow-lg relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="md:rounded-xl"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              {slide.type === "video" ? (
                <div className="relative w-full h-96 md:h-[500px]">
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
                    <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
                      {slide.title}
                    </h1>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex items-center justify-center h-96 md:h-[500px] ${slide.bgColor}`}
                >
                  <div className="text-center px-4">
                    <h2 className="text-2xl md:text-4xl text-white font-bold mb-2">
                      {slide.title}
                    </h2>
                    {slide.subtitle && (
                      <p className="text-white text-lg md:text-2xl">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flechas personalizadas pegadas al borde y sin bordes redondeados */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer custom-prev z-10">
          <div className="w-11 h-26 botonSlider flex items-center justify-center">
            <img
              src="/left.svg"
              alt="Anterior"
              className="w-6 h-6 brightness-200"
            />
          </div>
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer custom-next z-10">
          <div className="w-11 h-26 botonSlider flex items-center justify-center">
            <img
              src="/right.svg"
              alt="Siguiente"
              className="w-6 h-6 brightness-200"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="featureContainer"></div>
      </div>
    </section>
  );
}
