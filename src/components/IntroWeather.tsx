// import Lottie from "lottie-react";
import React from "react";
// import IntroAnimation from "../assets/animations/intro-weather.json";

const IntroWeather = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      {/* <Lottie
        animationData={IntroAnimation}
        loop={true}
        style={{ width: 150, height: 150 }}
      /> */}
      <p>Enter city to search for a forecast.</p>
    </div>
  );
};

export default IntroWeather;
