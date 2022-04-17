import Chart, { Plugin as ChartJSPlugin } from "chart.js/auto";

export type UnitAxis = "x" | "y";

export class UnitShowerPlugin implements ChartJSPlugin {
  id = "unitShower";

  readonly axis: UnitAxis;
  readonly content: string;

  constructor(axis: "x" | "y", content: string) {
    this.axis = axis;
    this.content = content;
  }

  afterDraw(chart: Chart) {
    const canvas = chart.ctx;
    canvas.save();

    const textSize = canvas.measureText(this.content);
    const textWidth = textSize.width;
    const textHeight =
      textSize.actualBoundingBoxDescent + textSize.actualBoundingBoxAscent;

    const x = this.axis === "x" ? chart.chartArea.right + 5 : textWidth;
    const y =
      this.axis === "y"
        ? chart.chartArea.top - textHeight
        : chart.chartArea.bottom + 20;

    canvas.fillText(this.content, x, y);
    canvas.restore();
  }
}
