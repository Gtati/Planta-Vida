import React from 'react';
import './ImageLink.css'; 

const ImageLink = ({ image, linkUrl, altText }) => {
  return (
    <div className='image-link'> 
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="image-link"
    >
      <img
        src={image}
        alt={altText}
        className="image-link-img"
      />
    </a>
    </div>
  );
};

export default ImageLink;
