import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { SidebarContextProvider } from "./context/SidebarContext.jsx";
import { MemberContextProvider } from "./context/editmemberContext";
import { BookContextProvider } from "./context/BookContext";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <SidebarContextProvider>
    <MemberContextProvider>
      <BookContextProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </BookContextProvider>
    </MemberContextProvider>
  </SidebarContextProvider>
);
