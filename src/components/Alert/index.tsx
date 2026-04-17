import styles from "./styles.module.css";

type Props = {
  type: "sucess" | "warning" | "error";
  message: string;
};

export type AlertOption = {
  type: "sucess" | "warning" | "error";
  message: string;
  isOpen: boolean;
};

export function Alert({ type, message }: Props) {
  const getClassName = () => {
    if (type === "error") return styles.error;

    if (type === "warning") return styles.warning;

    return styles.sucess;
  };

  return (
    <div className={styles.alertOverlay}>
      <div className={`${styles.alert} ${getClassName()}`}>{message}</div>
    </div>
  );
}
