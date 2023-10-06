import React, { useEffect, useState } from "react";
import Img1 from "./assets/1.jpg";
import Img2 from "./assets/2.jpg";
import Img3 from "./assets/3.jpg";
import Img4 from "./assets/4.jpg";
import Img6 from "./assets/6.jpg";
import { FancyCarousel } from "./Carrousel.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { GoArrowLeft, GoArrowRight } from "react-icons/go";
function App() {
  const [swiper, setSwiper] = useState(null);
  const data = [
    {
      title: "Titre 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      image: Img1,
    },
    {
      title: "Titre 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: Img2,
    },
    {
      title: "Titre 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: Img3,
    },
    {
      title: "Titre 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: Img4,
    },
    {
      title: "Titre 5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: Img6,
    },
  ];
  const noOfImages: number = data.length;
  const theta: number = 360 / noOfImages;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carousel, setCarousel] = useState({
    carouselOrietation: 0,
    elementOrientation: 0,
    focusElement: 0,
  });
  const rotateRight = (theta: number, noOfImages: number, index: number) => {
    setCarousel({
      carouselOrietation: carousel.carouselOrietation + theta,
      elementOrientation: carousel.elementOrientation - theta,
      focusElement:
        carousel.focusElement < noOfImages - 1 ? carousel.focusElement + 1 : 0,
    });
  };

  const rotateLeft = (theta: number, noOfImages: number, index: number) => {
    setCarousel({
      carouselOrietation: carousel.carouselOrietation - theta,
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
    setCarousel({
      carouselOrietation: carousel.carouselOrietation + theta * index,
      elementOrientation: carousel.elementOrientation - theta * index,
      focusElement:
        carousel.focusElement < noOfImages - index
          ? carousel.focusElement + index
          : 0,
    });
  };
  console.log(swiper);

  useEffect(() => {
    swiper?.slideTo(selectedIndex);
  }, [selectedIndex]);

  return (
    <div
      className={
        "w-full max-w-[1200px] mx-auto h-[100vh] flex items-center justify-between"
      }
    >
      <div className={"w-[50%]  flex items-center justify-center"}>
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
            <SwiperSlide key={index}>
              <div className="flex items-center justify-between px-24">
                <GoArrowLeft
                  onClick={() => rotateLeft(theta, noOfImages, index)}
                />
                <h1 className="text-[22px] font-medium">{item.title}</h1>
                <GoArrowRight
                  onClick={() => rotateRight(theta, noOfImages, index)}
                />
              </div>

              <p className="font-medium text-[16px]">{item.description}</p>

              <img
                src={item.image}
                className="mx-auto w-full h-[400px] object-contain"
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
