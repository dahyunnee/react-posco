// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
// import user from "./modules/user";
// // import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";
// import { composeWithDevTools } from "redux-devtools-extension";
// // import persistReducer from "redux-persist/es/persistReducer";
// import { legacy_createStore as createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";

// const persistConfig = {
//   key: "user",
//   storage,
//   blacklist: ["auth"],
// };

// const rootReducer = combineReducers({
//   user,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   persistedReducer,
// //   composeWithDevTools(applyMiddleware(thunk))
// );

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./modules/user";

// persistConfig 정의
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"], // 'auth'는 여기서 제외되어야 합니다. user 슬라이스에서 'auth' 부분을 가리키는지 확인하세요.
};

// persistedReducer 정의
const persistedReducer = persistReducer(persistConfig, userReducer);

// Store 생성
const store = configureStore({
  reducer: persistedReducer, // rootReducer 대신 persistedReducer를 직접 사용합니다.
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware), // 필요한 경우 여기에 추가 미들웨어를 삽입할 수 있습니다.
});

// persisted store 생성
const persistor = persistStore(store);

// RootState와 AppDispatch 타입을 내보내기
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// store와 persistor 모두 내보내기
export { store, persistor };
