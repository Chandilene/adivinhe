import styles from "./styles.module.css";

type Props = React.ComponentProps<"button"> & {
  children: React.ReactNode;
};

export function Button({ children, ...rest }: Props) {
  return (
    <button type="button" className={styles.button} {...rest}>
      {children}
    </button>
  );
}
