import Color from "color";

const baseColor = Color("#ba2736");

const rotationUnit = 6;

export function generateColor(index: number) {
  return baseColor
    .rotate(((index % rotationUnit) / rotationUnit) * 360 + index * 5)
    .lighten((index / rotationUnit) * 0.1)
    .saturate((index / rotationUnit) * 0.05)
    .hex();
}
