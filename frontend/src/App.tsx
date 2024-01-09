import './App.css';
import Header from './components/common/Header';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
    </ThemeProvider>
  );
}

export default App;
