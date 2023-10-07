import { FC, CSSProperties } from "react";
import { twMerge } from "tailwind-merge";

interface CarouselInfo {
  carousel: {
    carouselOrientation: number;
    elementOrientation: number;
    focusElement: number;
  };
  setCarousel: React.Dispatch<
    React.SetStateAction<{
      carouselOrientation: number;
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
  autoRotateTime = 0,
  transitionTime = 1.5,
  navigationTextSize = 2,
  navigationButtonRadius = 32.5,
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
  data.reverse().forEach((_, index) => {
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
    <div className="bg-transparent">
      <div
        className="z-[5] bg-transparent"
        style={{
          // backgroundImage: borderElement,
          height: `${carouselRadius * 2}px`,
          width: `${carouselRadius * 2}px`,
          transition: `${transitionTime}`,
        }}
      >
        <div
          className={
            "relative origin-center rounded-[50%] bg-transparent duration-[0.5s]"
          }
          style={{
            transform: `rotate(${carousel.carouselOrientation}deg)`,
            height: `${carouselRadius * 2}px`,
            width: `${carouselRadius * 2}px`,
          }}
        >
          {data.reverse().map((item, index) =>
            index !== carousel.focusElement ? (
              <div
                className="absolute bottom-0 m-2 flex items-center justify-center rounded-full bg-transparent opacity-50 duration-[0.5s]"
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
                  } absolute top-[-50px] block  transition-all duration-500 ease-in-out`}
                >
                  {item.title}
                </h1>
                <img
                  className="rounded-[50%]"
                  src={item.image}
                  style={{
                    width: `${peripheralImageRadius * 2}px`,
                    height: `${peripheralImageRadius * 2}px`,
                  }}
                />
              </div>
            ) : (
              <div
                className="absolute bottom-0 m-2 flex items-center justify-center rounded-full bg-transparent duration-[0.5s]"
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
                  } absolute top-[-50px] block  transition-all duration-500 ease-in-out`}
                >
                  {item.title}
                </h1>
                <img
                  className="rounded-[50%]"
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
            className="absolute bottom-0 m-2 flex items-center justify-center rounded-full bg-transparent duration-[0.5s]"
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
              className="rounded-full"
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
        className={twMerge(
          autoRotateTime ? "hidden" : "",
          "z-[1] flex bottom-0 left-0 bg-transparent"
        )}
        style={{
          gap: `${carouselRadius * 2}px`,
          marginLeft: `-${navigationButtonRadius * 1.8}px`,
        }}
      >
        <button
          className="rotate-180 rounded-full border-none bg-green-400 text-white outline-none hover:cursor-pointer hover:border-none hover:outline-none"
          onClick={() => rotateLeft(theta, noOfImages, carousel.focusElement)}
          style={{
            ...{
              width: `${navigationButtonRadius * 2}px`,
              height: `${navigationButtonRadius * 2}px`,
              // backgroundColor: `#${navigationButtonBgColor}`,
              // color: `#${navigationButtonColor}`,
              fontSize: `${navigationTextSize}rem`,
            },
            ...navigationButtonStyling,
          }}
        >
          ↓
        </button>
        <button
          className="rounded-full border-none bg-green-400 text-white outline-none hover:cursor-pointer hover:border-none hover:outline-none"
          onClick={() => rotateRight(theta, noOfImages, carousel.focusElement)}
          style={{
            ...{
              width: `${navigationButtonRadius * 2}px`,
              height: `${navigationButtonRadius * 2}px`,
              // backgroundColor: `#${navigationButtonBgColor}`,
              // color: `#${navigationButtonColor}`,
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
