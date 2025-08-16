import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { SidebarContextProvider } from "./context/SidebarContext.jsx";

createRoot(document.getElementById("root")).render(
  <SidebarContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SidebarContextProvider>
);
