import "chart.js/auto";

import styles from "./populationChangeGraph.module.scss";
import {
  getActualMeasuredChanges,
  PopulationChange,
} from "~/domain/polulationChange";
import React from "react";
import { Prefecture } from "~/domain/prefecture";
import { useAPIProxyClient } from "~/api/proxy/hook/useAPIProxyClient";
import useSWR from "swr";
import { Graph, GraphDataSeries } from "../atom/graph";
import { AsyncDataHandler } from "../templates/asyncDataHandler";

const usePopulationChanges = (prefsToShow: Prefecture[]) => {
  const apiProxyClient = useAPIProxyClient();
  const prefIDs = prefsToShow.map((p) => p.id);

  return useSWR(["populationChange", prefIDs], () =>
    apiProxyClient.population.fetchPopulationChange(prefsToShow)
  );
};

export interface PopulationChangeGraph {
  prefsToShow: Prefecture[];
}
export const PopulationChangeGraph: React.FC<PopulationChangeGraph> = ({
  prefsToShow,
}) => {
  const { data: populationChanges, error } = usePopulationChanges(prefsToShow);

  const dataSeries = React.useMemo(() => {
    return populationChanges?.map(generateSeriesFromPopulationChanges);
  }, [populationChanges]);

  if (prefsToShow.length === 0) {
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
      <AsyncDataHandler
        data={dataSeries}
        error={error}
        skeletonProps={{
          className: styles.loading_skeleton,
        }}
      >
        {(series) => <Graph dataSeries={series} xUnit="年度" yUnit="人口数" />}
      </AsyncDataHandler>
    </div>
  );
};

const generateSeriesFromPopulationChanges = (
  populationChanges: PopulationChange
): GraphDataSeries => {
  return {
    name: populationChanges.pref.name,
    data: getActualMeasuredChanges(populationChanges).map((c) => ({
      x: c.year,
      y: c.population,
    })),
  };
};
