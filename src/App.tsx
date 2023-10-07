import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FancyCarousel } from "./Carrousel";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { data } from "./data";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import gsap from "gsap";
function App() {
  const [swiper, setSwiper] = useState(null);
  const noOfImages: number = data.length;
  const theta: number = 360 / noOfImages;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carousel, setCarousel] = useState({
    carouselOrientation: 0,
    elementOrientation: 0,
    focusElement: 0,
  });
  const rotateRight = (theta: number, noOfImages: number) => {
    setCarousel({
      carouselOrientation: carousel.carouselOrientation + theta,
      elementOrientation: carousel.elementOrientation - theta,
      focusElement:
        carousel.focusElement < noOfImages - 1 ? carousel.focusElement + 1 : 0,
    });
  };

  const rotateLeft = (theta: number, noOfImages: number) => {
    setCarousel({
      carouselOrientation: carousel.carouselOrientation - theta,
      elementOrientation: carousel.elementOrientation + theta,
      focusElement:
        carousel.focusElement > 0 ? carousel.focusElement - 1 : noOfImages - 1,
    });
  };
  const scrollToClicked = (
    index: number,
    theta: number,
    noOfImages: number
  ) => {
    console.log(theta * index);
    setCarousel({
      carouselOrientation: carousel.carouselOrientation + theta * index,
      elementOrientation: carousel.elementOrientation - theta * index,
      focusElement:
        carousel.focusElement < noOfImages - index
          ? carousel.focusElement + index
          : 0,
    });
  };

  useEffect(() => {
    swiper?.slideTo(selectedIndex);
  }, [selectedIndex]);
  const compRef = useRef(null);
  useLayoutEffect(() => {
    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    const ctx = gsap.context(() => {
      gsap.from(".title", {
        duration: 0.75,
        y: -25,
        opacity: 0,
        ease: "ease-in-out",
      });
      gsap.from(".desc", {
        duration: 0.75,
        y: -25,
        opacity: 0,
        ease: "ease-in-out",
        delay: 0.75,
      });
      gsap.from(".img", {
        duration: 0.75,
        y: -25,
        opacity: 0,
        ease: "ease-in-out",
        delay: 1.5,
      });
    }, compRef); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, [selectedIndex]); // <- empty dependency Array so it doesn't re-run on every ren

  return (
    <div
      ref={compRef}
      className={
        "mx-auto flex h-[100vh] w-full max-w-[1200px] items-center justify-between"
      }
    >
      <div className={"flex  w-[50%] items-center justify-center"}>
        <FancyCarousel
          data={data}
          carouselRadius={200}
          peripheralImageRadius={50}
          centralImageRadius={75}
          carousel={carousel}
          setCarousel={setCarousel}
          setFocusElement={setSelectedIndex}
          rotateRight={rotateRight}
          rotateLeft={rotateLeft}
          scrollToClicked={scrollToClicked}
        />
      </div>
      <div className={"w-[50%] px-12"}>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          allowTouchMove={false}
          onSlideChange={() => setSelectedIndex(swiper.activeIndex)}
          onSwiper={setSwiper}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className={"overflow-visible pt-4"}>
              <div className="flex items-center justify-between px-24">
                <GoArrowLeft onClick={() => rotateLeft(theta, noOfImages)} />
                <h1 className={"title"}>{item.title}</h1>
                <GoArrowRight onClick={() => rotateRight(theta, noOfImages)} />
              </div>

              <p className="desc text-[16px] font-medium">{item.description}</p>

              <img
                src={item.image}
                className="img mx-auto h-[400px] w-full object-contain"
                alt={`Slide ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
