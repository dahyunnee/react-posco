import './App.css';
import Header from './components/common/Header';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Router from './components/common/Router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Router />
    </ThemeProvider>
  );
}

export default App;
// import React from "react";
// import { RouterProvider, Routes } from "react-router-dom";
// import router from "./router/routes";
// import MainPage from "./pages/MainPage";

// const App = () => (
//   // <Container isOverflowed>
//   <RouterProvider router={router} />
//   // </Container>
// );

// export default App;