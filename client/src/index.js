import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = { key: "root", storage, version: 1 };
// This line creates a configuration object persistConfig for redux-persist. It specifies the key for the root of the Redux state, the storage engine to use (storage), and the version number of the persisted state.

const persistedReducer = persistReducer(persistConfig, authReducer);
// This line creates a new reducer persistedReducer by wrapping the authReducer with the persistReducer function from redux-persist. This enables the persistence of the authReducer state.

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        {/*  The PersistGate component delays rendering until the persisted state
        is retrieved and loaded.*/}

        {/* The persistStore function is provided by the redux-persist library and is responsible for creating the persistor object that manages the persistence of the Redux store. The persistor object coordinates the retrieval and loading of the persisted state. */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
