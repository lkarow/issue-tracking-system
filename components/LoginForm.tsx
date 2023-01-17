import React, { useState } from "react";
import styles from "../styles/AccessModal.module.css";

type LoginData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  return (
    <form className={styles.modalForm}>
      <fieldset>
        <label htmlFor="username-input">Username</label>
        <input
          name="username"
          id="username-input"
          type="text"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="password-input">Password</label>
        <input
          name="password"
          id="password-input"
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
      </fieldset>
      <div className={styles.row}>
        <input className={styles.loginBtn} type="submit" value="Log in" />
      </div>
    </form>
  );
}
