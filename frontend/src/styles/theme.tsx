import { DefaultTheme } from 'styled-components';

const color = {
    yellow00: '#FCD15E',
    yellow01: '#FFE09B',
    yellow02: '#FFF0D1',
    background: '#FFFAED',
    black: '#000000',
    white: '#ffffff',
    gray: '#F2F1F1',
    progress_green: '#ABDBAC',
    progress_orange: '#FFCEA3',
    progress_purple: '#C4A8FF',
    progress_light_pink: '#FFC1EB',
    progress_pink: '#FFAFA7',
    progress_brown: '#D9AA76'
};

const fontWeight = {
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
};

const theme: DefaultTheme = {
    color,
    fontWeight,
};

export default theme;