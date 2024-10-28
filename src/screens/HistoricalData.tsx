import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchHistoricalData } from "../services/weatherApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  HistoricalData as HistoricalDataType,
  RootState,
} from "../types/weather";
import { IntroWeather, Loading } from "components";

const HistoricalData: React.FC = () => {
  const city = useSelector((state: RootState) => state.weather.city);
  const { data, isLoading, error } = useQuery<HistoricalDataType[], Error>(
    ["historicalData", city],
    () => fetchHistoricalData(city),
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
      <h2 className="text-2xl font-bold mb-4">Historical Data for {city}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="high"
            stroke="#8884d8"
            name="High Temperature"
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#82ca9d"
            name="Low Temperature"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalData;
