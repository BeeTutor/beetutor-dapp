import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: defaultConfig.theme?.tokens?.colors?.orange ?? {},
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        fg: {
          value: "black",
        },
        bg: {
          value: "colors.gray.200",
        },
        border: {
          emphasized: { value: "colors.primary.500" },
        },
        color: {
          palette: {
            ...(defaultConfig.theme?.tokens?.colors?.orange ?? {}),
            solid: {
              value: "colors.primary.500",
            },
            focus: {
              ring: { value: "colors.primary.500" },
            },
          },
        },
      },
    },
    recipes: {
      button: defineRecipe({
        variants: {
          visual: {
            solid: { bg: "colorPalette.800", color: "white" },
          },
        },
        defaultVariants: {
          visual: "solid",
          colorPalette: "primary",
        },
      }),
      input: defineRecipe({
        base: { _focus: { outlineWidth: 0 } },
      }),
    },
  },
});

export const system = createSystem(defaultConfig, config);
