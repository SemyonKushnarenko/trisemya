import Project from './Project';
import MicrofrontendLoader from './MicrofrontendLoader';
import ThreeJSLoader from './ThreeJSLoader';
import React from 'react';

export default function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Project />
      <div className="border border-gray-300 rounded-lg">
        <MicrofrontendLoader />
      </div>
      <div className="border border-gray-300 rounded-lg">
        <ThreeJSLoader />
      </div>
      <Project />
      <Project />
    </div>
  );
}
