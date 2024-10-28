import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchCurrentWeather } from "../services/weatherApi";
import { WeatherData, RootState } from "../types/weather";
import { Loading, WeatherIcon, IntroWeather, ErrorWeather } from "components";
// import { TopCitiesWeather } from "screens";

const CurrentWeather = () => {
  const city = useSelector((state: RootState) => state.weather.city);
  const { data, isLoading, error } = useQuery<WeatherData, Error>(
    ["currentWeather", city],
    () => fetchCurrentWeather(city),
    {
      enabled: !!city,
      cacheTime: 600000,
      staleTime: 600000,
    }
  );

  if (!city) return <IntroWeather />;
  if (isLoading) return <Loading />;
  if (error) return <ErrorWeather error={error} />;
  // if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Current Weather in {city}</h2>
      <div className="flex items-center">
        <WeatherIcon condition={data.weather[0].main} size="large" />
        <div className="ml-4">
          <p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className="text-xl">{data.weather[0].description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
