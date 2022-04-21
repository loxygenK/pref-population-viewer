import "chart.js/auto";
import { ChartOptions } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { generateColor } from "~/util/generateColor";
import { UnitShowerPlugin } from "./graph/unitShowerPlugin";

import React from "react";

export interface GraphData {
  x: number;
  y: number;
}
export interface GraphDataSeries {
  name: string;
  data: Array<GraphData>;
}
export interface GraphProps {
  dataSeries: Array<GraphDataSeries>;
  xUnit: string;
  yUnit: string;
}
export const Graph: React.FC<GraphProps> = ({ dataSeries, xUnit, yUnit }) => {
  const config = React.useMemo(
    () => buildGraphConfiguration(dataSeries),
    [dataSeries]
  );
  return (
    <Chart
      type="line"
      data={config.data}
      options={config.options}
      plugins={[
        new UnitShowerPlugin("x", xUnit),
        new UnitShowerPlugin("y", yUnit),
      ]}
    />
  );
};

const buildGraphConfiguration = (dataSeries: Array<GraphDataSeries>) => {
  if (dataSeries.length === 0) {
    throw new Error("At lease one series must be provided.");
  }

  const data = {
    labels: dataSeries[0].data.map((d) => d.x),
    datasets: dataSeries.map((s) => ({
      label: s.name,
      backgroundColor: generateColor(s.dataIndex),
      borderColor: generateColor(s.dataIndex),
      data: s.data.map((d) => d.y),
    })),
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: "start",
        position: "right",
        labels: {
          usePointStyle: true,
          pointStyle: "line",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return { data, options };
};
