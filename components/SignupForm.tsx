import React, { useState } from "react";
import styles from "../styles/AccessModal.module.css";

import useSnackBar from "../hooks/useSnackBar";
import SnackBar from "./SnackBar";

type Prop = {
  onClose: any;
};

type SignupData = {
  Username: string;
  Email: string;
  Password: string;
};

export default function SignupForm({ onClose }: Prop) {
  const [signupData, setSignupData] = useState<SignupData>({
    Username: "",
    Email: "",
    Password: "",
  });

  const [isShowingSnackBar, toggleSnackBar] = useSnackBar();
  const [setSnackBarInfo, setSetSnackBarInfo] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });
    if (response.status === 200) {
      setSetSnackBarInfo("Created new account");
      toggleSnackBar();
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <>
      <SnackBar
        showSnackBar={isShowingSnackBar}
        onCloseSnackBar={toggleSnackBar}
        infoText={setSnackBarInfo}
      />
      <form className={styles.modalForm} onSubmit={(e) => handleSignup(e)}>
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
          <label htmlFor="username-input">Email</label>
          <input
            name="Email"
            id="email-input"
            type="text"
            placeholder="Email"
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
            className={styles.loginBtn}
            type="submit"
            value="Sign up"
            disabled={
              !signupData.Username || !signupData.Email || !signupData.Password
            }
          />
        </div>
      </form>
    </>
  );
}
