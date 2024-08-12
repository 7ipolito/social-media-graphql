import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from './loading.json';


export default function Animation() {

  return (
    <div className="flex items-center justify-center w-56">
      <Lottie animationData={loadingAnimation}/>
    </div>
  );
}