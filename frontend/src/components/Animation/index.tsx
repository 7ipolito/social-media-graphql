import React from "react";
import Lottie from "lottie-react";

export default function Animation({ animation, ...rest }: any) {
  return (
    <div className={`flex items-center justify-center`} {...rest}>
      <Lottie animationData={animation} />
    </div>
  );
}
