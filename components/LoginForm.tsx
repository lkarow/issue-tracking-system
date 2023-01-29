import React, { useState } from "react";
import styles from "../styles/AccessModal.module.css";

import useSnackBar from "../hooks/useSnackBar";
import SnackBar from "./SnackBar";

import { signIn } from "next-auth/react";

type Prop = {
  onClose: any;
};

type LoginData = {
  Username: string;
  Password: string;
};

export default function LoginForm({ onClose }: Prop) {
  const [loginData, setLoginData] = useState<LoginData>({
    Username: "",
    Password: "",
  });

  const [isShowingSnackBar, toggleSnackBar] = useSnackBar();
  const [snackBarInfo, setSnackBarInfo] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setSnackBarInfo("You are being logged in.");
    toggleSnackBar();
    await signIn("credentials", {
      redirect: false,
      username: loginData.Username,
      password: loginData.Password,
    });
    onClose();
  };

  return (
    <>
      <SnackBar
        showSnackBar={isShowingSnackBar}
        onCloseSnackBar={toggleSnackBar}
        infoText={snackBarInfo}
      />
      <form className={styles.modalForm} onSubmit={(e) => handleLogin(e)}>
        <fieldset>
          <label htmlFor="username-input">Username</label>
          <input
            name="Username"
            id="username-input"
            type="text"
            placeholder="Username"
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password-input">Password</label>
          <input
            name="Password"
            id="password-input"
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
        </fieldset>
        <div className={styles.row}>
          <input
            className={`${styles.accessBtn} ${styles.loginBtn}`}
            type="submit"
            value="Log in"
            disabled={!loginData.Username || !loginData.Password}
          />
        </div>
      </form>
    </>
  );
}
