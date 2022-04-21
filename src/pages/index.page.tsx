import type { NextPage } from "next";
import React from "react";
import { apiClient } from "~/api/client/client";
import { CheckBoxList } from "~/components/molecules/checkboxList";
import {
  PopulationChangeGraph,
  PopulationChangeWithIndex,
} from "~/components/atom/graph";
import { Section } from "~/components/atom/section";
import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import styles from "./index.page.module.scss";
import { ValueWithID } from "~/types/valueWithId";

interface HomeProps {
  prefectures: Array<Prefecture>;
  populationChanges: Array<PopulationChange>;
}
const Home: NextPage<HomeProps> = ({ prefectures, populationChanges }) => {
  const [enabledPrefIDs, setEnabledPrefIDs] = React.useState<string[]>([]);

  const onCheckboxChange = (newCheckedIDs: string[]) => {
    setEnabledPrefIDs(() => newCheckedIDs);
  };

  const checkboxValues: Array<ValueWithID<string>> | undefined =
    React.useMemo(() => {
      return prefectures?.map((p) => ({ id: p.id, value: p.name }));
    }, [prefectures]);

  const shownPopulationChanges: Array<PopulationChangeWithIndex> =
    React.useMemo(() => {
      return populationChanges
        .map((p, i) => ({ dataIndex: i, populationChange: p }))
        .filter((p) => enabledPrefIDs.includes(p.populationChange.pref.id));
    }, [enabledPrefIDs, populationChanges]);

  return (
    <div className={styles.page_wrapper}>
      <article className={styles.content}>
        <Section title="都道府県" className={styles.pref_list}>
          <CheckBoxList
            values={checkboxValues}
            checkedIDs={enabledPrefIDs}
            onChange={onCheckboxChange}
          />
        </Section>
        <Section title="人口数" className={styles.population_graph}>
          <PopulationChangeGraph populationChanges={shownPopulationChanges} />
        </Section>
      </article>
      <aside className={styles.credits}>
        RESAS (地域経済分析システム) 提供のデータを加工して作成
      </aside>
    </div>
  );
};

export const getStaticProps = async () => {
  const prefectures = await apiClient.pref.fetchPrefectures();
  const populationChanges = await apiClient.population.fetchPopulationChange(
    prefectures
  );

  return {
    props: {
      prefectures,
      populationChanges,
    },
    revalidate: 60 * 60 * 24 * 30,
  };
};

export default Home;
