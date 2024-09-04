import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { rollbarConfig } from "./get-rollbar-config.ts";
import "./index.css";
import { ErrorBoundary, Provider } from "@rollbar/react";

const getApp = () => {
  if (!rollbarConfig) {
    return <App />;
  }

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>{getApp()}</StrictMode>,
);
