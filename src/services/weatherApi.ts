import axios from "axios";
import { WeatherData, ForecastData, HistoricalData } from "../types/weather";

export const fetchCurrentWeather = async (
  city: string
): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>(
    `${process.env.REACT_APP_BASE_URL}/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  );
  console.log("fetchCurrentWeather: ", response);
  return response.data;
};

export const fetchForecast = async (city: string): Promise<ForecastData> => {
  const response = await axios.get<ForecastData>(
    `${process.env.REACT_APP_BASE_URL}/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
  );
  console.log("fetchForecast: ", response);

  return response.data;
};

export const fetchHistoricalData = async (
  city: string
): Promise<HistoricalData[]> => {
  // Note: OpenWeatherMap doesn't provide free historical data
  // This is a mock implementation
  const mockData: HistoricalData[] = Array.from({ length: 12 }, (_, i) => ({
    date: new Date(2023, i, 1).toLocaleDateString(),
    high: Math.round(Math.random() * 20 + 10),
    low: Math.round(Math.random() * 10),
  }));
  console.log("fetchHistoricalData: ", fetchHistoricalData);
  return mockData;
};
