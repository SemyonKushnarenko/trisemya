import React from 'react';

const ThreeJSIframe: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '400px', position: 'relative' }}>
      <iframe
        src="http://localhost:3002"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px',
        }}
        title="Three.js 3D Scene"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default ThreeJSIframe;
