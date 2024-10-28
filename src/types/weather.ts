export interface WeatherData {
  weather: {
    main: string;
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
    };
    weather: {
      main: string;
      description: string;
    }[];
  }[];
}

export interface HistoricalData {
  date: string;
  high: number;
  low: number;
}

export interface RootState {
  weather: {
    city: string;
  };
}
