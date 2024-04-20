import { combineReducers, configureStore } from "@reduxjs/toolkit";



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
import AdminAuthSlice from "../featuer/admin/AdminAuthSlice";
import AdminSlice from "../featuer/admin/AdminSlice";
import ExecutiveSlice from "../featuer/executive/ExecutiveSlice";
import ExecutiveAuthSlice from "../featuer/executive/ExecutiveAuth";

// import AdminSlice from "../features/admin/AdminSlice";
// import StudentSlice from "../features/student/StudentSlice";

const rootReducer = combineReducers({
  adminAuth:AdminAuthSlice,
 
  admin:AdminSlice,
executive:ExecutiveSlice,
executiveAuth: ExecutiveAuthSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
