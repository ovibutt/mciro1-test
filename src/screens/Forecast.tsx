import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchForecast } from "../services/weatherApi";
import { IntroWeather, Loading, WeatherIcon } from "components";
import { ForecastData, RootState } from "../types/weather";

const Forecast: React.FC = () => {
  const city = useSelector((state: RootState) => state.weather.city);
  const { data, isLoading, error } = useQuery<ForecastData, Error>(
    ["forecast", city],
    () => fetchForecast(city),
    {
      enabled: !!city,
      cacheTime: 600000,
      staleTime: 600000,
    }
  );

  if (!city) return <IntroWeather />;
  if (isLoading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">5-Day Forecast for {city}</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {data.list
          .filter((item, index) => index % 8 === 0)
          .map((day) => (
            <div key={day.dt} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-bold">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </p>
              <WeatherIcon condition={day.weather[0].main} size="medium" />
              <p className="text-xl font-bold">{Math.round(day.main.temp)}°C</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forecast;
