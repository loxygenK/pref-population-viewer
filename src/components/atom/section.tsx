import styles from "./section.module.scss";

export interface SectionProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}
export const Section: React.FC<SectionProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <section className={className}>
      <h2 className={styles.section_heading}>{title}</h2>
      {children}
    </section>
  );
};
