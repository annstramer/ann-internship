import React from 'react'

const NextArrow = ({ cClass, style, onClick }) => {
  return (
    <button
      className={cClass}
      style={{ ...style, display: 'block', fontSize: '30px' }}
      onClick={onClick}
      aria-label="Next slide" // Providing the accessible label
    >
      ›
    </button>
  );
}

export default NextArrow