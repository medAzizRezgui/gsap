import { FC, useState, CSSProperties } from "react";

interface CarouselInfo {
  carousel: {
    carouselOrietation: number;
    elementOrientation: number;
    focusElement: number;
  };
  setCarousel: React.Dispatch<
    React.SetStateAction<{
      carouselOrietation: number;
      elementOrientation: number;
      focusElement: number;
    }>
  >;
  rotateRight: (theta: number, noOfImages: number, index: number) => void;
  rotateLeft: (theta: number, noOfImages: number, index: number) => void;
  scrollToClicked: (index: number, theta: number, noOfImages: number) => void;
  data: { title: string; description: string; image: string }[];
  setFocusElement?: any;
  offsetAngle?: number;
  carouselRadius?: number;
  centralImageRadius?: number;
  centralImageBoxShadow?: string;
  peripheralImageRadius?: number;
  peripheralImageBoxShadow?: string;
  focusElementStyling?: CSSProperties;
  border?: boolean;
  borderWidth?: number;
  borderHexColor?: string;
  autoRotateTime?: number;
  transitionTime?: number;
  navigationTextSize?: number;
  navigationButtonRadius?: number;
  navigationButtonBgColor?: string;
  navigationButtonColor?: string;
  navigationButtonStyling?: CSSProperties;
}

export const FancyCarousel: FC<CarouselInfo> = ({
  data,
  setFocusElement = () => {},
  offsetAngle = 0,
  carouselRadius = 400,
  centralImageRadius = 125,
  centralImageBoxShadow = "5px 10px 18px #888888",
  peripheralImageRadius = 75,
  peripheralImageBoxShadow = "5px 10px 18px #888888",
  focusElementStyling = {},
  border = true,
  borderWidth = 5,
  borderHexColor = "CB786C",
  autoRotateTime = 0,
  transitionTime = 1.5,
  navigationTextSize = 2,
  navigationButtonRadius = 32.5,
  navigationButtonBgColor = "CB786C",
  navigationButtonColor = "FFFFFF",
  navigationButtonStyling = {},
  carousel,
  rotateRight,
  rotateLeft,
  scrollToClicked,
}: CarouselInfo) => {
  setFocusElement(carousel.focusElement);

  if (autoRotateTime) {
    setTimeout(() => {
      rotateRight(theta, noOfImages, 1);
    }, autoRotateTime * 1000);
  }

  const noOfImages: number = data.length;
  const theta: number = 360 / noOfImages;

  const newCoordinates: number[][] = [];
  data.forEach((_, index) => {
    newCoordinates.push([
      carouselRadius -
        peripheralImageRadius +
        carouselRadius * Math.cos((2 * Math.PI * index) / noOfImages),
      carouselRadius -
        peripheralImageRadius +
        carouselRadius * Math.sin((2 * Math.PI * index) / noOfImages),
    ]);
  });

  const totalDeviation: number = (offsetAngle * Math.PI) / 180 + Math.PI / 2;

  const rotatedCoordinates: number[][] = [];
  const centerCoordinate: number = carouselRadius - peripheralImageRadius;
  newCoordinates.forEach((item) => {
    rotatedCoordinates.push([
      centerCoordinate +
        (item[0] - centerCoordinate) * Math.cos(totalDeviation) -
        (item[1] - centerCoordinate) * Math.sin(totalDeviation),
      centerCoordinate +
        (item[0] - centerCoordinate) * Math.sin(totalDeviation) +
        (item[1] - centerCoordinate) * Math.cos(totalDeviation),
    ]);
  });

  return (
    <div className="fancy-carousel-wrapper-element">
      <div
        className="fancy-carousel-border"
        style={{
          // backgroundImage: borderElement,
          height: `${carouselRadius * 2}px`,
          width: `${carouselRadius * 2}px`,
          transition: `${transitionTime}`,
        }}
      >
        <div
          className="fancy-carousel"
          style={{
            transform: `rotate(${carousel.carouselOrietation}deg)`,
            height: `${carouselRadius * 2}px`,
            width: `${carouselRadius * 2}px`,
          }}
        >
          {data.map((item, index) =>
            index !== carousel.focusElement ? (
              <div
                className="fancy-carousel-element opacity-50"
                onClick={() =>
                  scrollToClicked(
                    index - carousel.focusElement,
                    theta,
                    noOfImages
                  )
                }
                key={index}
                style={{
                  transform: `rotate(${carousel.elementOrientation}deg)`,
                  width: `${peripheralImageRadius * 2}px`,
                  height: `${peripheralImageRadius * 2}px`,
                  left: `${rotatedCoordinates[index][0]}px`,
                  bottom: `${rotatedCoordinates[index][1]}px`,
                  boxShadow: `${peripheralImageBoxShadow}`,
                  transition: `${transitionTime}`,
                }}
              >
                <h1
                  className={` ${
                    carousel.focusElement === index
                      ? "text-[20px]"
                      : "text-[12px]"
                  } block absolute top-[-50px]  transition-all ease-in-out duration-500`}
                >
                  {item.title}
                </h1>
                <img
                  className="fancy-carousel-image"
                  src={item.image}
                  style={{
                    width: `${peripheralImageRadius * 2}px`,
                    height: `${peripheralImageRadius * 2}px`,
                  }}
                />
              </div>
            ) : (
              <div
                className="fancy-carousel-element"
                key={index}
                style={{
                  ...{
                    transform: `rotate(${carousel.elementOrientation}deg)`,
                    width: `${peripheralImageRadius * 2}px`,
                    height: `${peripheralImageRadius * 2}px`,
                    left: `${rotatedCoordinates[index][0]}px`,
                    bottom: `${rotatedCoordinates[index][1]}px`,
                    boxShadow: `${peripheralImageBoxShadow}`,
                    transition: `${transitionTime}`,
                  },
                  ...focusElementStyling,
                }}
              >
                <h1
                  className={` ${
                    carousel.focusElement === index
                      ? "text-[32px] font-medium"
                      : "text-[12px]"
                  } block absolute top-[-50px]  transition-all ease-in-out duration-500`}
                >
                  {item.title}
                </h1>
                <img
                  className="fancy-carousel-image"
                  src={item.image}
                  style={{
                    width: `${peripheralImageRadius * 2}px`,
                    height: `${peripheralImageRadius * 2}px`,
                    transition: `${transitionTime}`,
                  }}
                />
              </div>
            )
          )}

          <div
            className="fancy-carousel-element central-img"
            key={noOfImages}
            style={{
              transform: `rotate(${carousel.elementOrientation}deg)`,
              width: `${centralImageRadius * 2}px`,
              height: `${centralImageRadius * 2}px`,
              left: `${carouselRadius - centralImageRadius - 10}px`,
              bottom: `${carouselRadius - centralImageRadius - 10}px`,
              boxShadow: `${centralImageBoxShadow}`,
              transition: `${transitionTime}`,
            }}
          >
            <img
              className="fancy-carousel-central-image"
              src={data[carousel.focusElement].image}
              style={{
                width: `${centralImageRadius * 2}px`,
                height: `${centralImageRadius * 2}px`,
                transition: `${transitionTime}`,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={
          "fancy-carousel-navigators " + (autoRotateTime ? "invisible" : "")
        }
        style={{
          gap: `${carouselRadius * 2}px`,
          marginLeft: `-${navigationButtonRadius * 1.8}px`,
        }}
      >
        <button
          className="fancy-carousel-navigation-button"
          onClick={() => rotateLeft(theta, noOfImages, carousel.focusElement)}
          style={{
            ...{
              width: `${navigationButtonRadius * 2}px`,
              height: `${navigationButtonRadius * 2}px`,
              backgroundColor: `#${navigationButtonBgColor}`,
              color: `#${navigationButtonColor}`,
              fontSize: `${navigationTextSize}rem`,
            },
            ...navigationButtonStyling,
          }}
        >
          ↓
        </button>
        <button
          className="fancy-carousel-navigation-button"
          onClick={() => rotateRight(theta, noOfImages, carousel.focusElement)}
          style={{
            ...{
              width: `${navigationButtonRadius * 2}px`,
              height: `${navigationButtonRadius * 2}px`,
              backgroundColor: `#${navigationButtonBgColor}`,
              color: `#${navigationButtonColor}`,
              fontSize: `${navigationTextSize}rem`,
            },
            ...navigationButtonStyling,
          }}
        >
          ↓
        </button>
      </div>
    </div>
  );
};
