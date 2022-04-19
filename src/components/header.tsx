import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>pref-population-viewer</h1>
    </header>
  );
};
