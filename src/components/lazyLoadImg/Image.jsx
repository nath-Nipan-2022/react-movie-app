import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ src, alt, className, style }) => {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      src={src}
      className={className || ""}
      style={style || {}}
    />
  );
};

export default Image;
