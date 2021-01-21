import { createMuiTheme } from '@material-ui/core/styles';

// customs colors
// Color name :(
const white = '#ffffff';
const lightWhite = '#F2F7FC';
const lighteshWhite = '#EBF2F7';
const lightGray = '#D3D3D3';
const lightGrayish = '#A7B9D0';
const lightBlack = '#202224';
const lighterBlack = '#363F4D';
const blue = '#4880FF';
const lightBlue = '#6c99ff';
const red = '#f44336';

export default createMuiTheme({
  palette: {
    primary: {
      main: white,
    },
    common: {
      // Tts use to defince common colors
      // by default it has white and black color
      lightWhite,
      lighteshWhite,
      lightGray,
      lightGrayish,
      lightBlack,
      lighterBlack,
      lightBlue,
      blue,
      red,
    },
    text: {
      primary: lightBlack,
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});
