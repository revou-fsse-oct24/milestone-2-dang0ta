import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DEFAULT_IMAGE_BASE_URL = new URL("https://placehold.co")

/**
 * ImageLoader component handles image loading with a fallback for errors, 
 * and on-loading effect.
 * 
 * @param src - The source URL of the image
 * @param alt - The alt text for the image
 * @returns an image component
 */
export function ImageLoader({ src, alt, width, height }: { src: string; alt?: string, width?: number, height?: number }) {
  const [img, setImg] = useState(src);

  const getPlaceholderImageURL = (): string => {
    const w = width ? width : 400;
    const h =  height ? height : 400;

    return new URL(`${w}x${h}`,DEFAULT_IMAGE_BASE_URL).toString();

  }

  /**
   * Handles image loading errors by setting a default image URL.
   */
  const onError = () => {
    setImg(getPlaceholderImageURL());
  };

  

  return (
    <LazyLoadImage
      width={width ?? 400}
      height={height ?? 400}
      src={img}
      alt={alt}
      onError={onError}
    />
  );
}
