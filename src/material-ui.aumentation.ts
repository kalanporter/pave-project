import { TypographyOptions } from '@material-ui/core/styles/createTypography';
import {
  PaletteOptions,
  Palette,
  PaletteColorOptions,
  PaletteColor,
} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    white: PaletteColorOptions;
    black: PaletteColorOptions;
  }
  interface Palette {
    white: PaletteColor;
    black: PaletteColor;
  }
}
