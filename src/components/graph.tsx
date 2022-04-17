import "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { generateColor } from "~/util/generateColor";

export const Graph: React.FC = () => {
  const data = {
    labels: ["0", "1", "2"],
    datasets: Array.from({ length: 47 }).map((_, i) => ({
      label: `Data set ${i}`,
      backgroundColor: generateColor(i),
      borderColor: generateColor(i),
      data: [0, 100 + i * 20, 200 + i * 20],
    })),
  };

  return <Chart type="line" data={data} />;
};
