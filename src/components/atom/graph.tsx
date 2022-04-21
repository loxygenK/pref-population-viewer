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

export interface PopulationChangeWithIndex {
  dataIndex: number;
  populationChange: PopulationChange;
}
export interface PopulationChangeGraphProps {
  populationChanges: Array<PopulationChangeWithIndex>;
}
export const PopulationChangeGraph: React.FC<PopulationChangeGraphProps> = ({
  populationChanges,
}) => {
  const config = React.useMemo(
    () => buildGraphConfiguration(populationChanges),
    [populationChanges]
  );
  if (config === undefined) {
    return (
      <div className={styles.suggestion_area}>
        <span className={styles.suggestion_text}>
          都道府県リストから表示する都道府県を選択してください
        </span>
      </div>
    );
  }

  return (
    <div className={styles.graph_area}>
      <Chart
        type="line"
        data={config.data}
        options={config.options}
        plugins={[
          new UnitShowerPlugin("x", "年度"),
          new UnitShowerPlugin("y", "人口数"),
        ]}
      />
    </div>
  );
};

const buildGraphConfiguration = (
  populationChanges: Array<PopulationChangeWithIndex>
) => {
  if (populationChanges.length === 0) {
    return undefined;
  }

  const data = {
    labels: getActualMeasuredChanges(populationChanges[0].populationChange).map(
      (c) => c.year
    ),
    datasets: populationChanges.map((c) => ({
      label: c.populationChange.pref.name,
      backgroundColor: generateColor(c.dataIndex),
      borderColor: generateColor(c.dataIndex),
      data: getActualMeasuredChanges(c.populationChange).map(
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
