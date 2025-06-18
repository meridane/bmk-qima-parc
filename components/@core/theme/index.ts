const theme = (mode: SystemMode, direction: Theme['direction']) => {
  return {
    direction,
    components: overrides(),
    colorSchemes: colorSchemes(),
    customShadows: customShadows(mode),
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 12
      }
    },
    shadows: shadows(mode),
    typography: typography()
  } as unknown as Theme
}
