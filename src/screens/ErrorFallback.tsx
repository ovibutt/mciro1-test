import React from "react";

type ErrorFallbackTypes = {
  error: any;
  resetErrorBoundary: any;
};

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackTypes) => {
  return (
    <div role="alert">
      <p>This is not you. This is us:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};

export default ErrorFallback;
