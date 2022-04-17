import "chart.js/auto";
import { ChartData, ChartOptions } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { generateColor } from "~/util/generateColor";
import { UnitShowerPlugin } from "./graph/unitShowerPlugin";

import styles from "./graph.module.scss";
import { PopulationChange } from "~/domain/polulationChange";
import React from "react";

export interface PopulationChangeGraphProps {
  populationChanges: Array<PopulationChange>;
}
export const PopulationChangeGraph: React.FC<PopulationChangeGraphProps> = ({
  populationChanges,
}) => {
  const data: ChartData<"line"> = React.useMemo(
    () => ({
      labels:
        populationChanges[0]?.getSortedActualChanges().map((c) => c.year) ?? [],
      datasets: populationChanges.map((c, i) => ({
        label: c.pref.name,
        backgroundColor: generateColor(i),
        borderColor: generateColor(i),
        data: c.getSortedActualChanges().map((c) => c.population),
      })),
    }),
    [populationChanges]
  );

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

  return (
    <div className={styles.graph}>
      <Chart
        type="line"
        data={data}
        options={options}
        plugins={[
          new UnitShowerPlugin("x", "年度"),
          new UnitShowerPlugin("y", "人口数"),
        ]}
      />
    </div>
  );
};
