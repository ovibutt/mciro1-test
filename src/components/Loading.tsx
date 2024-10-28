import Lottie from "lottie-react";
import React from "react";
import LoadingAnimation from "../assets/animations/loading.json";

const Loading = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <Lottie
        animationData={LoadingAnimation}
        loop={true}
        style={{ width: 150, height: 150 }}
      />
      <p>Hold Tight!</p>
    </div>
  );
};

export default Loading;
