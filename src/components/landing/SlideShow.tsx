import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./SlideShow.module.css";

const images = [
  {
    url: "/img/slide-show/2.png",
    caption: "Costillas de cerdo",
  },
  {
    url: "/img/slide-show/3.png",
    caption: "Pasta con camarones",
  },
  {
    url: "/img/slide-show/4.png",
    caption: "Pasta con camarones",
  },
];

export const SlideShow = () => {
  return (
    <div>
      <Slide easing="ease" duration={5000} indicators>
        {images.map((image) => {
          return (
            <div className={styles[`each-slide`]} key={image.caption}>
              <div
                style={{
                  backgroundImage: `url(${image.url})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
          );
        })}
      </Slide>
    </div>
  );
};
