import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SidebarContextProvider } from './context/SidebarContext.jsx';
import { MemberContextProvider } from './context/editmemberContext';
import { BookContextProvider } from './context/BookContext';
import { LendingBookContextProvider } from './context/LendingBookContext';
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from 'react-redux';
import { store, persistor } from "./store/store";
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <SidebarContextProvider>
            <MemberContextProvider>
              <BookContextProvider>
                <LendingBookContextProvider>
                  <App />
                </LendingBookContextProvider>
              </BookContextProvider>
            </MemberContextProvider>
          </SidebarContextProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);