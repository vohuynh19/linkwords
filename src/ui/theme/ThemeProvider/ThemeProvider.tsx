import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { config } from '@/ui/theme/_config';
import {
  generateFontSizes,
  generateFontColors,
  staticFontStyles,
} from '@/ui/theme/fonts';
import {
  generateBorderColors,
  generateBorderRadius,
  generateBorderWidths,
} from '@/ui/theme/borders';
import layout from '@/ui/theme/layout';
import componentsGenerator from '@/ui/theme/components';
import { generateBackgrounds } from '@/ui/theme/backgrounds';
import { generateGutters } from '@/ui/theme/gutters';
import generateConfig from '@/ui/theme/ThemeProvider/generateConfig';

import type { ComponentTheme, Theme } from '@/types/theme/theme';
import type {
  FulfilledThemeConfiguration,
  Variant,
} from '@/types/theme/config';
import { useStore } from '@/core/stores';

// Types

type Context = Theme & {
  changeTheme: (variant: Variant) => void;
};

export const ThemeContext = createContext<Context | undefined>(undefined);

type Props = PropsWithChildren;

function ThemeProvider({ children = false }: Props) {
  const { setTheme, theme: cachedTheme } = useStore();

  // Current theme variant
  const [variant, setVariant] = useState(cachedTheme || 'default');

  const changeTheme = (nextVariant: Variant) => {
    setVariant(nextVariant);
    setTheme(nextVariant);
  };

  // Flatten config with current variant
  const fullConfig = useMemo(() => {
    return generateConfig(variant) satisfies FulfilledThemeConfiguration;
  }, [variant, config]);

  const fonts = useMemo(() => {
    return {
      ...generateFontSizes(),
      ...generateFontColors(fullConfig),
      ...staticFontStyles,
    };
  }, [fullConfig]);

  const backgrounds = useMemo(() => {
    return generateBackgrounds(fullConfig);
  }, [fullConfig]);

  const borders = useMemo(() => {
    return {
      ...generateBorderColors(fullConfig),
      ...generateBorderRadius(),
      ...generateBorderWidths(),
    };
  }, [fullConfig]);

  const navigationTheme = useMemo(() => {
    return {
      dark: variant === 'dark',
      colors: fullConfig.navigationColors,
    };
  }, [variant, fullConfig.navigationColors]);

  const theme = useMemo(() => {
    return {
      colors: fullConfig.colors,
      variant,
      gutters: generateGutters(),
      layout,
      fonts,
      backgrounds,
      borders,
    } satisfies ComponentTheme;
  }, [variant, layout, fonts, backgrounds, borders, fullConfig.colors]);

  const components = useMemo(() => {
    return componentsGenerator(theme);
  }, [theme]);

  const value = useMemo(() => {
    return { ...theme, components, navigationTheme, changeTheme };
  }, [theme, components, navigationTheme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;