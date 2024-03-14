'use client';
import React, { useState, useEffect } from 'react';

const imageUrls = [
  'agie/public/user.png',

];

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(currentImageIndex => (currentImageIndex + 1) % imageUrls.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="image-slider">
      <img src={imageUrls[currentImageIndex]} alt="Slideshow Image" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default ImageSlider;