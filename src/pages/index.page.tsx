import type { NextPage } from "next";
import React from "react";
import { apiClient } from "~/api/client/client";
import { Section } from "~/components/atom/section";
import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import styles from "./index.page.module.scss";
import { PrefectureCheckBoxList } from "~/components/organisms/prefectureCheckboxList";
import { PopulationChangeGraph } from "~/components/organisms/populationChangeGraph";

interface HomeProps {
  populationChanges: Array<PopulationChange>;
}
const Home: NextPage<HomeProps> = ({ populationChanges }) => {
  const [enabledPrefs, setEnabledPrefs] = React.useState<Prefecture[]>([]);

  const onCheckboxChange = (newCheckedPrefs: Prefecture[]) => {
    setEnabledPrefs(() => newCheckedPrefs);
  };

  return (
    <div className={styles.page_wrapper}>
      <article className={styles.content}>
        <Section title="都道府県" className={styles.pref_list}>
          <PrefectureCheckBoxList
            selectedPrefs={enabledPrefs}
            onChange={onCheckboxChange}
          />
        </Section>
        <Section title="人口数" className={styles.population_graph}>
          <PopulationChangeGraph prefsToShow={enabledPrefs} />
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
