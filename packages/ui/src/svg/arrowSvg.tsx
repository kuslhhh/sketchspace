// components/CurvedArrowNote.js
import React from 'react';

const CurvedArrowNote = () => {
  return (
    <div style={{ position: 'relative', width: '300px', height: '200px' }}>
      {/* SVG Curved Arrow */}
      <svg
        width="300"
        height="200"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#999" />
          </marker>
        </defs>
        <path
          d="M50,180 Q120,60 250,50"
          stroke="#bbb"
          strokeWidth="3"
          fill="none"
          markerEnd="url(#arrowhead)"
          strokeDasharray="3,3"
        />
      </svg>

      {/* Text */}
      <div
        style={{
          position: 'absolute',
          bottom: -10,
          left: 10,
          fontFamily: 'Comic Sans MS, cursive',
          fontSize: '16px',
          color: '#aaa',
        }}
      >
        You can drag it<br />
      </div>
    </div>
  );
};

export default CurvedArrowNote;
