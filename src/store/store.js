import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import bookReducer from "../features/BookSlice";
import membersReducer from "../features/MemberSlice";
import overdueSlice from "../features/overdueSlice";
import requestBooksReducer from "../features/RequestBookSlice";
import borrowedBookReducer from "../features/borrowedBooksSlice";
import loginReducer from "../features/LoginSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootReducer = combineReducers({
  books: bookReducer,
  members: membersReducer,
  login: loginReducer,
  overDue: overdueSlice,
  requestbooks: requestBooksReducer,
  borrowedBooks: borrowedBookReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"]
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 👇 prevents redux-persist warnings in console
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor for <PersistGate>
export const persistor = persistStore(store);
