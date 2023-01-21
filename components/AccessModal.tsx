import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styles from "../styles/AccessModal.module.css";

import { useSession } from "next-auth/react";

type Prop = {
  showModal: any;
  onClose: any;
};

export default function AccessModal({ showModal, onClose }: Prop) {
  const [modal, setModal] = useState("login");

  const { status } = useSession();

  if (!showModal) return null;
  return (
    <div className="modalWrapper" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div>
          <h1>{modal === "login" && "Welcome back!"}</h1>
          <h1>{modal === "registration" && "Welcome!"}</h1>
        </div>
        {modal === "login" && (
          <>
            <LoginForm onClose={onClose} />
            {status !== "authenticated" && (
              <div className={styles.switchInfo}>
                <span>You don&apos;t have an account yet?</span>{" "}
                <span
                  className={styles.switchLink}
                  onClick={() => setModal("registration")}
                >
                  Sign up
                </span>
              </div>
            )}
          </>
        )}
        {modal === "registration" && (
          <>
            <SignupForm onClose={onClose} />
            <div className={styles.switchInfo}>
              <span>You already have an account?</span>{" "}
              <span
                className={styles.switchLink}
                onClick={() => setModal("login")}
              >
                Log in
              </span>
            </div>
          </>
        )}
        <button className="modalCloseButton" onClick={onClose}>
          &#x2715;
        </button>
      </div>
    </div>
  );
}
