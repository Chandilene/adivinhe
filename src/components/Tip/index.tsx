import styles from "./styles.module.css";
import iconTip from "../../assets/tip.svg";
type Props = {
  tip: string;
};

export function Tip({ tip }: Props) {
  return (
    <div className={styles.tip}>
      <img src={iconTip} alt="icone de dica" />

      <div>
        <h3>Dicas</h3>
        <p>{tip}</p>
      </div>
    </div>
  );
}
