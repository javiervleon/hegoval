import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useRef, useEffect, useState } from "react";

export default function HeroSlider() {
  const swiperRef = useRef(null);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // 🔹 1. Fetch video desde videoslider
        const resVideo = await fetch(
          "http://localhost:8881/wp-json/wp/v2/videoslider"
        );
        const videoData = await resVideo.json();

        // suponiendo que solo hay 1 registro en videoslider
        const videoSlide = videoData.length
          ? {
              type: "video",
              src: videoData[0].acf.video, // si usas ACF
              title: videoData[0].title.rendered,
            }
          : null;

        // 🔹 2. Fetch imágenes desde slider
        const resImages = await fetch(
          "http://localhost:8881/wp-json/wp/v2/slider"
        );
        const imageData = await resImages.json();

        const imageSlides = imageData.map((item) => ({
          type: "image",
          src: item.acf?.image_url,
          title: item.title?.rendered,
          subtitle: item.acf?.subtitle,
        }));

        // 🔹 3. Combinar => video primero, luego imágenes
        const finalSlides = videoSlide
          ? [videoSlide, ...imageSlides]
          : imageSlides;

        setSlides(finalSlides);
      } catch (err) {
        console.error("Error cargando slides:", err);
      }
    };

    fetchSlides();
  }, []);

  const handleVideoEnded = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
      swiperRef.current.autoplay.start(); // reanudar autoplay para siguientes slides
    }
  };

  const handleAutoplay = (activeIndex) => {
    const activeSlide = slides[activeIndex];
    if (!swiperRef.current) return;

    if (activeSlide?.type === "video") {
      swiperRef.current.autoplay.stop(); // pausa autoplay
    } else {
      swiperRef.current.autoplay.start(); // reanuda autoplay para slides normales
    }
  };

  return (
    <section id="home" className="flex flex-col items-center">
      <div className="w-full max-w-7xl md:rounded-xl overflow-hidden shadow-lg relative">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={slides[0]?.type !== "video" ? false : true} // Si el primer slide es video, no hacer loop
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            handleAutoplay(swiper.activeIndex); // inicial
          }}
          onSlideChange={(swiper) => handleAutoplay(swiper.activeIndex)}
          className="md:rounded-xl"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              {slide.type === "video" ? (
                <div className="relative w-full aspect-[16/9]">
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnded}
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="relative w-full aspect-[16/9]">
                  <img
                    src={slide.src}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
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

        {/* Flechas */}
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
    </section>
  );
}
