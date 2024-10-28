import Lottie from "lottie-react";
import React from "react";
import ErrorAnimation from "../assets/animations/error.json";

type ErrorWeatherTypes = {
  error: any;
};

const ErrorWeather = ({ error }: ErrorWeatherTypes) => {
  console.log("ErrorWeather: ", error);
  return (
    <div className="flex justify-center items-center flex-col">
      <Lottie
        animationData={ErrorAnimation}
        loop={true}
        style={{ width: 150, height: 150 }}
      />
      <p>{error?.response?.data?.message}</p>
    </div>
  );
};

export default ErrorWeather;
