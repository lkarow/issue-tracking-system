import React, { useState } from "react";
import styles from "../styles/AccessModal.module.css";

import { useSession, signIn, signOut } from "next-auth/react";

type Prop = {
  onClose: any;
};

type LoginData = {
  Username: string;
  Password: string;
};

export default function LoginForm({ onClose }: Prop) {
  const { data: session } = useSession();

  const [loginData, setLoginData] = useState<LoginData>({
    Username: "",
    Password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    await signIn("credentials", {
      redirect: false,
      username: loginData.Username,
      password: loginData.Password,
    });
    onClose();
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await signOut({ redirect: false });
    onClose();
  };

  if (session) {
    return (
      <div className={styles.modalForm}>
        Signed in as {session.user.name} <br />
        <button
          className={`${styles.accessBtn} ${styles.logoutBtn}`}
          onClick={(e) => handleLogout(e)}
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
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
  );
}
