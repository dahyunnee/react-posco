import React from "react";
import { RouterProvider, Routes } from "react-router-dom";
import router from "./router/routes";
import MainPage from "./pages/MainPage";

const App = () => (
  // <Container isOverflowed>
  <RouterProvider router={router} />
  // </Container>
);

export default App;