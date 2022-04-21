import React from "react";

export interface CheckboxProps {
  id: string;
  checked: boolean;
  label: string;
  onChange: (becomeChecked: boolean) => void;
}
export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  label,
  onChange,
}) => {
  const onCheckboxChanged = () => {
    onChange(!checked);
  };

  return (
    <label htmlFor={id}>
      <input id={id} type="checkbox" onChange={onCheckboxChanged} />
      {label}
    </label>
  );
};
