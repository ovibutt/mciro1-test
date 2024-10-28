import React from "react";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import { WeatherIconProps } from "types/components";

const iconMap: { [key: string]: React.ComponentType } = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Thunderstorm: CloudLightning,
};

const colorMap: { [key: string]: string } = {
  Clear: "#F9D71C",
  Clouds: "#c7c4bf",
  Rain: "#9099A1",
  Snow: "#BDDEEC",
  Thunderstorm: "#3f7db2",
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
  condition,
  size = "medium",
}) => {
  const Icon = iconMap[condition] || Cloud;
  const color = colorMap[condition] || Cloud;
  const sizeClass = size === "large" ? "w-16 h-16" : "w-8 h-8";
  return (
    //@ts-ignore
    <Icon className={sizeClass} color={color} />
  );
};

export default WeatherIcon;
