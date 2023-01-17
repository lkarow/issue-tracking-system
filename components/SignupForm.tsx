import React, { useState } from "react";
import styles from "../styles/AccessModal.module.css";

type SignupData = {
  username: string;
  email: string;
  password: string;
};

export default function SignupForm() {
  const [signupData, setSignupData] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setSignupData({
      ...signupData,
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
        <label htmlFor="username-input">Email</label>
        <input
          name="email"
          id="email-input"
          type="text"
          placeholder="Email"
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
        <input className={styles.loginBtn} type="submit" value="Sign up" />
      </div>
    </form>
  );
}
