import { extendTheme, theme as base } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: {
      bg: mode('#fff', '#2d3142')(props),
    },
  }),
};

const colors = {
  brand: {
    50: '#F25767',
    100: '#052163',
    200: '#333333',
    300: '#0B163F',
    400: '#F6D8DD',
    500: '#CBD9FB',
    600: '#175CFF',
    700: '#4b1483',
    800: '#341158',
    900: '#1e0d2d',
  },
};

const fonts = {
  heading: `'Montserrat', ${base.fonts.heading}`,
  body: `'Montserrat', ${base.fonts.body}`,
};

const components = {
  Button: {
    variants: {
      pill: (props) => ({
        ...base.components.Button.variants.outline(props),
        rounded: 'full',
        color: 'gray.500',
      }),
    },
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, colors, fonts, components });
export default theme;
