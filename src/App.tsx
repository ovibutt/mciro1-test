import React, { ErrorInfo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./store";
import { ErrorBoundary } from "react-error-boundary";
import { Header, SearchBar } from "components";
import {
  CurrentWeather,
  ErrorFallback,
  Forecast,
  HistoricalData,
} from "screens";

const queryClient = new QueryClient();

const logError = (error: Error, info: ErrorInfo) => {
  console.error(error, info);
};

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-gray-100">
              <Header />
              <main className="container mx-auto px-4 py-8">
                <SearchBar />
                <Routes>
                  <Route path="/" element={<CurrentWeather />} />
                  <Route path="/forecast" element={<Forecast />} />
                  <Route path="/historical" element={<HistoricalData />} />
                </Routes>
              </main>
            </div>
          </Router>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
