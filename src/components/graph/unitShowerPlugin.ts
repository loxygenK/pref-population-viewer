import Chart, { ChartArea, Plugin as ChartJSPlugin } from "chart.js/auto";

export type UnitAxis = "x" | "y";

export class UnitShowerPlugin implements ChartJSPlugin {
  id = "unitShower";

  readonly axis: UnitAxis;
  readonly content: string;

  constructor(axis: UnitAxis, content: string) {
    this.axis = axis;
    this.content = content;
  }

  beforeRender(chart: Chart) {
    const currentPadding = chart.options.layout?.padding ?? {};

    if (typeof currentPadding !== "object") {
      throw new Error(
        "Padding configuration should be undefined or object if this plugin is used"
      );
    }

    let newPadding: Partial<ChartArea> = {};
    if (this.axis === "x") {
      newPadding = {
        ...currentPadding,
        right: Math.max(30, currentPadding.right ?? 0),
      };
    } else {
      newPadding = {
        ...currentPadding,
        top: Math.max(30, currentPadding.top ?? 0),
      };
    }

    chart.options.layout = {
      ...(chart.options.layout ?? {}),
      padding: newPadding,
    };
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
