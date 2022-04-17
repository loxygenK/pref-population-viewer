import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <span className={styles.title}>pref-population-viewer</span>
    </header>
  );
};
