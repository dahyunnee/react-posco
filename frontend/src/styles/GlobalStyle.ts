import { createGlobalStyle } from 'styled-components';
import OmyuPretty from '../assets/fonts/OmyuPretty.ttf';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'OmyuPretty';
        src: local('OmyuPretty'), url(${OmyuPretty}) format('woff2');
        font-weight: normal;
        font-style: normal;
    }
`;

export default GlobalStyle;