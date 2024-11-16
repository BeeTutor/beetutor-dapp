import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
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
          value: "colors.gray.100",
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
          colorPalette: "current",
        },
      }),
      input: defineRecipe({
        variants: {
          visual: {
            outline: {
              borderWidth: "1px",
              borderColor: "gray.300",
              bg: "gray.50",
            },
          },
        },
        defaultVariants: {
          visual: "outline",
        },
      }),
    },
    slotRecipes: {
      select: defineSlotRecipe({
        slots: ["trigger", "content", "item"],
        variants: {
          variant: {
            outline: {
              trigger: {
                bg: "gray.50",
              },
              content: {
                bg: "gray.50",
              },
              item: {
                bg: { _hover: "gray.100" },
              },
            },
          },
        },
      }),
    },
  },
});

export const system = createSystem(defaultConfig, config);
