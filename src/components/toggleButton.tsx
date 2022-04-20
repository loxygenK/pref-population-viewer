import styles from "./toggleButton.module.scss";

export interface ToggleButtonProps {
  className?: string;
  captionWhenUnpressed: string;
  captionWhenPressed: string;
  pressed: boolean;
  onChange: (newPressedState: boolean) => void;
}
export const ToggleButton: React.FC<ToggleButtonProps> = ({
  className,
  captionWhenPressed,
  captionWhenUnpressed,
  pressed,
  onChange,
}) => {
  const onButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onChange(!pressed);
  };

  return (
    <button
      className={`${styles.toggle_button} ${pressed ? styles.pressed : ""} ${
        className ?? ""
      }`}
      onClick={onButtonClicked}
    >
      {pressed ? captionWhenPressed : captionWhenUnpressed}
    </button>
  );
};
