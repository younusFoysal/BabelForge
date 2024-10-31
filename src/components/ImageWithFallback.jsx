'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const ImageWithFallback = ({ src, fallbackSrc, alt = 'Image', ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      // Ensure layout stability with width and height or fill
      width={rest.width || 300}
      height={rest.height || 300}
    />
  );
};

export default ImageWithFallback;
