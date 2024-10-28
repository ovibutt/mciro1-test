import React from "react";
import { useQueries } from "react-query";
import { fetchCurrentWeather } from "../services/weatherApi";
import { WeatherData } from "../types/weather";
import WeatherIcon from "../components/WeatherIcon";

const TOP_CITIES = ["New York", "London", "Tokyo", "Paris", "Sydney"];

const TopCities: React.FC = () => {
  const results = useQueries(
    TOP_CITIES.map((city) => ({
      queryKey: ["currentWeather", city],
      queryFn: () => fetchCurrentWeather(city),
      cacheTime: 600000,
      staleTime: 600000,
    }))
  );

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Cities Weather</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {results.map((result, index) => {
          const city = TOP_CITIES[index];
          const data = result.data as WeatherData | undefined;

          if (result.isLoading)
            return (
              <div key={city} className="p-4 bg-gray-100 rounded-lg">
                Loading...
              </div>
            );
          if (result.error)
            return (
              <div key={city} className="p-4 bg-red-100 rounded-lg">
                Error: {(result.error as Error).message}
              </div>
            );
          if (!data) return null;

          return (
            <div key={city} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">{city}</h3>
              <div className="flex items-center">
                <WeatherIcon condition={data.weather[0].main} size="medium" />
                <span className="ml-2 text-2xl font-bold">
                  {Math.round(data.main.temp)}°C
                </span>
              </div>
              <p className="mt-2">{data.weather[0].description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCities;
