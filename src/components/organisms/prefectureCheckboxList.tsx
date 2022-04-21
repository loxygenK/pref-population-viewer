import React from "react";
import useSWR from "swr";
import { useAPIProxyClient } from "~/api/proxy/hook/useAPIProxyClient";
import { Prefecture } from "~/domain/prefecture";
import { ValueWithID } from "~/types/valueWithId";
import { CheckBoxList } from "../molecules/checkboxList";

const usePrefectures = () => {
  const apiProxyClient = useAPIProxyClient();
  return useSWR<Prefecture[]>("prefecture", () =>
    apiProxyClient.pref.fetchPrefectures()
  );
};

export interface PrefectureCheckBoxListProps {
  selectedPrefs: Prefecture[];
  onChange: (prefs: Prefecture[]) => void;
}
export const PrefectureCheckBoxList: React.FC<PrefectureCheckBoxListProps> = ({
  selectedPrefs,
  onChange,
}) => {
  const { data: prefs, error } = usePrefectures();

  const checkboxValues: Array<ValueWithID<string>> | undefined =
    React.useMemo(() => {
      return prefs?.map((p) => ({ id: p.id, value: p.name }));
    }, [prefs]);

  const selectedPrefIDs: Array<string> = React.useMemo(() => {
    return selectedPrefs.map((p) => p.id);
  }, [selectedPrefs]);

  const onCheckBoxChanged = (ids: string[]) => {
    if (prefs === undefined) {
      return;
    }

    const resolvedPrefs = prefs.filter((p) => ids.includes(p.id));
    onChange(resolvedPrefs);
  };

  if (checkboxValues === undefined) {
    // TODO: Create more fancier loading screen
    return <div>Loading...</div>;
  }

  return (
    <CheckBoxList
      values={checkboxValues}
      checkedIDs={selectedPrefIDs}
      onChange={onCheckBoxChanged}
    />
  );
};
