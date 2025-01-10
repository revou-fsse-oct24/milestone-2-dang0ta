import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DEFAULT_IMAGE_URL = "https://placehold.co/400";

/**
 * ImageLoader component handles image loading with a fallback for errors, 
 * and on-loading effect.
 * 
 * @param src - The source URL of the image
 * @param alt - The alt text for the image
 * @returns an image component
 */
export function ImageLoader({ src, alt }: { src: string; alt?: string }) {
  const [img, setImg] = useState(src);

  /**
   * Handles image loading errors by setting a default image URL.
   */
  const onError = () => {
    setImg(DEFAULT_IMAGE_URL);
  };

  return (
    <LazyLoadImage
      width={400}
      height={400}
      src={img}
      alt={alt}
      onError={onError}
    />
  );
}
