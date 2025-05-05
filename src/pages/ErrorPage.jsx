import React from "react";

const ErrorPage = ({ error }) => {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-red-500">Something went wrong</h1>
      <p>{error?.message || "An unexpected error occurred."}</p>
    </div>
  );
};

export default ErrorPage;
