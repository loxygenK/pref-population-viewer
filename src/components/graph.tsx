import "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { generateColor } from "~/util/generateColor";
import { UnitShowerPlugin } from "./graph/unitShowerPlugin";

export const Graph: React.FC = () => {
  const data: ChartData<"line"> = {
    labels: ["1", "2", "3"],
    datasets: Array.from({ length: 47 }).map((_, i) => ({
      label: `Data set ${i}`,
      backgroundColor: generateColor(i),
      borderColor: generateColor(i),
      data: [10000, 11000 + i * 20, 12000 + i * 20],
    })),
  };

  const options: ChartOptions<"line"> = {
    layout: {
      padding: 30,
    },
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

  return (
    <Chart
      type="line"
      data={data}
      options={options}
      plugins={[
        new UnitShowerPlugin("x", "年度"),
        new UnitShowerPlugin("y", "人口数"),
      ]}
    />
  );
};
