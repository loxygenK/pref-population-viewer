import React from "react";
import { ValueWithID } from "~/types/valueWithId";
import styles from "./checkboxList.module.scss";
import { ToggleButton } from "../atom/toggleButton";
import { Checkbox } from "../atom/checkbox";

export interface CheckBoxListProps {
  values: Array<ValueWithID<string>>;
  checkedIDs: Array<string>;
  onChange: (checkedIDs: Array<string>) => void;
}
export const CheckBoxList: React.FC<CheckBoxListProps> = ({
  values,
  checkedIDs,
  onChange,
}) => {
  const [shown, setShown] = React.useState(true);

  const onShowToggleButtonClicked = (newShownState: boolean) => {
    setShown(newShownState);
  };

  const onCheckboxChanged = (id: string) => (becomeChecked: boolean) => {
    let newCheckedIDs = [...checkedIDs];
    if (becomeChecked) {
      newCheckedIDs.push(id);
    } else {
      newCheckedIDs = newCheckedIDs.filter((e) => e !== id);
    }

    onChange(newCheckedIDs);
  };

  return (
    <div className={styles.checkbox_list_wrapper}>
      <ToggleButton
        className={styles.show_toggle_button}
        captionWhenPressed="折りたたむ"
        captionWhenUnpressed="表示する"
        pressed={shown}
        onChange={onShowToggleButtonClicked}
      />
      <ul className={`${styles.checkbox_list} ${shown ? "" : styles.collapse}`}>
        {values.map((v) => (
          <li key={v.id}>
            <Checkbox
              id={`check-${v.id}`}
              onChange={onCheckboxChanged(v.id)}
              checked={checkedIDs.indexOf(v.id) !== -1}
              label={v.value}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
