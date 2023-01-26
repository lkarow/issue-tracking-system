import styles from "../styles/LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.ldsGrid} data-testid="loading-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
