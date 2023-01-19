import React from "react";

import styles from "../styles/SnackBar.module.css";

type Prop = {
  showSnackBar: any;
  onCloseSnackBar: any;
  infoText: string;
  timeout?: number;
};

export default function SnackBar({
  showSnackBar,
  onCloseSnackBar,
  infoText,
  timeout = 1500,
}: Prop) {
  if (!showSnackBar) return null;

  if (showSnackBar) {
    setTimeout(() => {
      onCloseSnackBar();
    }, timeout);
    return (
      <div className={styles.snackBarWrapper}>
        <p>{infoText}</p>
      </div>
    );
  }
}
