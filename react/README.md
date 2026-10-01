# food-icon-pack / React

Lucide-style components generated from free Classic SVGs.

```tsx
import { Apple, Pizza } from "food-icon-pack/react";

<Apple size={32} color="#c2410c" />
```

## Props

| Prop | Default | Description |
|------|---------|-------------|
| `size` | `24` | Width and height |
| `color` | `currentColor` | Fill color for icon paths |
| … | | Other `SVGSVGElement` props (`className`, `aria-label`, etc.) |

## Duplicate names

These basenames appear in more than one category; use the prefixed export:

`IngredientsBeer` / `BeveragesBeer`, `IngredientsEspresso` / `BeveragesEspresso`, `DishesHummus` / `IngredientsHummus`, `IngredientsKefir` / `BeveragesKefir`, `IngredientsMilk` / `BeveragesMilk`, `IngredientsSake` / `BeveragesSake`, `IngredientsTomatoJuice` / `BeveragesTomatoJuice`.

## Build

From repo root:

```bash
npm run build:react
```

Output: `react/dist/` (published to npm on `npm publish`).
