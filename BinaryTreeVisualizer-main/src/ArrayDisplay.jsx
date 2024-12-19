import React from 'react';
import './ArrayDisplay.css';

const ArrayDisplay = ({ traversalArray }) => {
  return (
    <div className="array-display">
      {traversalArray.map((value, index) => (
        <div key={index} className="array-item">
          {value}
        </div>
      ))}
    </div>
  );
};

export default ArrayDisplay;
