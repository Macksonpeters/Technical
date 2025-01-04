import { configureStore, combineReducers, Tuple } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const encryptor = encryptTransform({
  secretKey: process.env.NEXT_PUBLIC_STORE_KEY,
  onError: function (error) {
    console.log(error);
  },
});

const persistConfig = {
  key: "technicaltest",
  version: 1,
  storage: storageSession,
  transforms: [encryptor],
};

const reducer = combineReducers({
  user: userReducer,
});


const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
