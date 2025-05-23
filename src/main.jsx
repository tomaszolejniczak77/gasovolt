import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavProvider } from "./context/NavContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UrlProvider } from "./context/UrlContext.jsx";
import "./index.css";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NavProvider>
        <AuthProvider>
          <UrlProvider>
            <App />
          </UrlProvider>
        </AuthProvider>
      </NavProvider>
    </QueryClientProvider>
  </StrictMode>
);
