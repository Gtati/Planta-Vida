import React, { useState, useEffect } from 'react';
import './Carrousel.css'; 

import imagen1 from '../../../assets/imagenes/img1.jpg';
import imagen2 from '../../../assets/imagenes/img2.jpg';
import imagen3 from '../../../assets/imagenes/img3.jpg';
import imagen4 from '../../../assets/imagenes/img4.jpg';
import imagen5 from '../../../assets/imagenes/img5.avif';



const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [imagen1, imagen2, imagen3, imagen4, imagen5];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval); 
  }, [currentIndex]); 

  return (
    <div className="carrusel">
      <button className="prev" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="slide">
        <img src={images[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
      </div>

      <button className="next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'dot active' : 'dot'}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
