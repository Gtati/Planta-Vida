import React, { useState, useEffect, useRef } from 'react';
import image1 from '../../../assets/plantavida-logo.webp';
import image2 from  '../../../assets/arbol1.jpeg';
import image3 from  '../../../assets/img2.jpeg';
import image4 from  '../../../assets/manoarbol.avif';
import image5 from  '../../../assets/img3.jpeg';
import './Carrousel.css'

const images = [image1, image2, image3, image4, image5];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      5000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-image">
        <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
      </div>
      <div className="carousel-controls">
        {images.map((_, index) => (
          <label key={index}>
            <input
              type="radio"
              checked={currentIndex === index}
              onChange={() => goToSlide(index)}
            />
            <span></span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

