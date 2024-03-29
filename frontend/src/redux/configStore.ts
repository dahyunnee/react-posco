import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import user from "./modules/user";
import calendar from "./modules/calendar";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
// import persistReducer from "redux-persist/es/persistReducer";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const persistConfig = {
  key: "user",
  storage,
  blacklist: ["auth"],
};

const rootReducer = combineReducers({
  user,
  calendar,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,}
  // composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;