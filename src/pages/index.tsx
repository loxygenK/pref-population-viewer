import type { NextPage } from "next";
import React from "react";
import { apiClient } from "~/api/client";
import { CheckBoxList } from "~/components/checkboxList";
import { PopulationChangeGraph } from "~/components/graph";
import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import styles from "~/styles/Home.module.scss";
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

  const shownPopulationChanges: Array<PopulationChange> = React.useMemo(() => {
    return populationChanges.filter((p) => enabledPrefIDs.includes(p.pref.id));
  }, [enabledPrefIDs, populationChanges]);

  return (
    <>
      <CheckBoxList
        values={checkboxValues}
        checkedIDs={enabledPrefIDs}
        onChange={onCheckboxChange}
      />
      <PopulationChangeGraph populationChanges={shownPopulationChanges} />
    </>
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
