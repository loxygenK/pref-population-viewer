import type { NextPage } from "next";
import React from "react";
import { useAPIClient } from "~/api/hook/context";
import { APIClient } from "~/api/hook/type";
import { CheckBoxList } from "~/components/checkboxList";
import { PopulationChangeGraph } from "~/components/graph";
import { PopulationChange } from "~/domain/polulationChange";
import { Prefecture } from "~/domain/prefecture";
import styles from "~/styles/Home.module.scss";
import { ValueWithID } from "~/types/valueWithId";

const usePrefectures = (api: APIClient): Array<Prefecture> | undefined => {
  const [pref, setPref] = React.useState<Array<Prefecture> | undefined>();

  React.useEffect(() => {
    api.pref.fetchPrefectures().then((p) => setPref(p));
  }, [api]);

  return pref;
};

const usePopulationChange = (
  api: APIClient,
  prefIDs: Array<string>
): Array<PopulationChange> | undefined => {
  const [populationChange, setPopulationChange] = React.useState<
    Array<PopulationChange> | undefined
  >();

  React.useEffect(() => {
    api.pref
      .fetchPrefectures()
      .then((prefs) => api.population.fetchPopulationChange(prefs))
      .then((changes) => setPopulationChange(changes));
  }, [api]);

  const filteredChages = React.useMemo(() => {
    return populationChange?.filter((c) => prefIDs.includes(c.pref.id));
  }, [populationChange, prefIDs]);

  return filteredChages;
};

const Home: NextPage = () => {
  const [enabledPrefIDs, setEnabledPrefIDs] = React.useState<string[]>([]);

  // FIXME: Fetch in the server side
  const api = useAPIClient();
  const prefecture = usePrefectures(api);
  const populationChange = usePopulationChange(api, enabledPrefIDs);

  const onCheckboxChange = (newCheckedIDs: string[]) => {
    setEnabledPrefIDs(() => newCheckedIDs);
  };

  const checkboxValues: Array<ValueWithID<string>> | undefined =
    React.useMemo(() => {
      return prefecture?.map((p) => ({ id: p.id, value: p.name }));
    }, [prefecture]);

  return (
    <>
      {checkboxValues !== undefined ? (
        <CheckBoxList
          values={checkboxValues}
          checkedIDs={enabledPrefIDs}
          onChange={onCheckboxChange}
        />
      ) : (
        <div>Loading...</div>
      )}
      {populationChange !== undefined ? (
        <PopulationChangeGraph populationChanges={populationChange} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Home;
