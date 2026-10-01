import { createElement, forwardRef } from "react";
import type { ReactElement, Ref, SVGProps } from "react";

export type IconNode = [tag: string, attrs: Record<string, string>];

export interface FoodIconProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  size?: number | string;
  color?: string;
}

export function createFoodIcon(
  displayName: string,
  viewBox: string,
  children: IconNode[],
) {
  const Icon = forwardRef<SVGSVGElement, FoodIconProps>(
    (
      {
        size = 24,
        color = "currentColor",
        className,
        stroke,
        strokeWidth,
        ...props
      },
      ref: Ref<SVGSVGElement>,
    ): ReactElement => {
      return createElement(
        "svg",
        {
          ref,
          xmlns: "http://www.w3.org/2000/svg",
          width: size,
          height: size,
          viewBox,
          fill: "none",
          className,
          stroke,
          strokeWidth,
          ...props,
        },
        children.map(([tag, attrs], index) =>
          createElement(tag, {
            ...attrs,
            fill: attrs.fill === "none" ? "none" : color,
            key: `${index}-${String(tag)}`,
          }),
        ),
      );
    },
  );

  Icon.displayName = displayName;
  return Icon;
}
