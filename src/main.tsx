import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { UsersContextProvider } from "./config/context/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UsersContextProvider>
      <App />
    </UsersContextProvider>
  </StrictMode>
);
