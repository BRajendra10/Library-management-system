import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import './index.css';
import App from './App.jsx';
import { SidebarContextProvider } from './context/SidebarContext.jsx';
import { MemberContextProvider } from './context/editmemberContext';
import { BookContextProvider } from './context/BookContext';
import { LendingBookContextProvider } from './context/LendingBookContext';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
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
    </Provider>
  </StrictMode>
);