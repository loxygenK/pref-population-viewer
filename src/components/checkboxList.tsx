import { ValueWithID } from "~/types/valueWithId";
import styles from "./checkboxList.module.scss";

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
  const onCheckboxChanged =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let newCheckedIDs = [...checkedIDs];
      if (e.target.checked) {
        newCheckedIDs.push(id);
      } else {
        newCheckedIDs = newCheckedIDs.filter((e) => e !== id);
      }

      onChange(newCheckedIDs);
    };

  return (
    <ul className={styles.checkbox_list}>
      {values.map((v) => (
        <li key={v.id}>
          <input
            id={`check-${v.id}`}
            type="checkbox"
            onChange={onCheckboxChanged(v.id)}
            checked={checkedIDs.indexOf(v.id) !== -1}
          />
          <label htmlFor={`check-${v.id}`}>{v.value}</label>
        </li>
      ))}
    </ul>
  );
};
