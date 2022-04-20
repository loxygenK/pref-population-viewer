import "chart.js/auto";
import { ChartOptions } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { generateColor } from "~/util/generateColor";
import { UnitShowerPlugin } from "./graph/unitShowerPlugin";

import styles from "./graph.module.scss";
import {
  getActualMeasuredChanges,
  PopulationChange,
} from "~/domain/polulationChange";
import React from "react";

export interface PopulationChangeGraphProps {
  populationChanges: Array<PopulationChange>;
}
export const PopulationChangeGraph: React.FC<PopulationChangeGraphProps> = ({
  populationChanges,
}) => {
  const config = React.useMemo(
    () => buildGraphConfiguration(populationChanges),
    [populationChanges]
  );
  if (config === undefined) {
    return <div></div>;
  }

  return (
    <Chart
      className={styles.graph}
      type="line"
      data={config.data}
      options={config.options}
      plugins={[
        new UnitShowerPlugin("x", "年度"),
        new UnitShowerPlugin("y", "人口数"),
      ]}
    />
  );
};

const buildGraphConfiguration = (
  populationChanges: Array<PopulationChange>
) => {
  if (populationChanges.length === 0) {
    return undefined;
  }

  const data = {
    labels: getActualMeasuredChanges(populationChanges[0]).map((c) => c.year),
    datasets: populationChanges.map((c, i) => ({
      label: c.pref.name,
      backgroundColor: generateColor(i),
      borderColor: generateColor(i),
      data: getActualMeasuredChanges(populationChanges[i]).map(
        (c) => c.population
      ),
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
