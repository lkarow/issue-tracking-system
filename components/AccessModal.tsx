import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import styles from "../styles/AccessModal.module.css";

import useSnackBar from "../hooks/useSnackBar";
import SnackBar from "./SnackBar";

import { useSession, signOut } from "next-auth/react";

type Prop = {
  showModal: any;
  onClose: any;
};

export default function AccessModal({ showModal, onClose }: Prop) {
  const [modal, setModal] = useState("login");

  const [isShowingSnackBar, toggleSnackBar] = useSnackBar();
  const [snackBarInfo, setSnackBarInfo] = useState("");

  const { status, data: session } = useSession();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    setSnackBarInfo("You are being logged out.");
    toggleSnackBar();
    await signOut({ redirect: false });
    onClose();
  };

  if (!showModal) return null;
  return (
    <>
      <SnackBar
        showSnackBar={isShowingSnackBar}
        onCloseSnackBar={toggleSnackBar}
        infoText={snackBarInfo}
      />
      <div className="modalWrapper" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div>
            <h1>{status === "authenticated" && "Logged in!"}</h1>
            <h1>
              {status !== "authenticated" &&
                modal === "login" &&
                "Welcome back!"}
            </h1>
            <h1>
              {status !== "authenticated" &&
                modal === "registration" &&
                "Welcome!"}
            </h1>
          </div>
          {session && (
            <div className={styles.modalForm}>
              Signed in as {session.user.name} <br />
              <button
                className={`${styles.accessBtn} ${styles.logoutBtn}`}
                onClick={(e) => handleLogout(e)}
              >
                Sign out
              </button>
            </div>
          )}
          {status !== "authenticated" && modal === "login" && (
            <>
              <LoginForm onClose={onClose} />
              <div className={styles.switchInfo}>
                <span>You don&apos;t have an account yet?</span>{" "}
                <span
                  className={styles.switchLink}
                  onClick={() => setModal("registration")}
                >
                  Sign up
                </span>
              </div>
            </>
          )}
          {status !== "authenticated" && modal === "registration" && (
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
          <button
            className="modalCloseButton"
            onClick={onClose}
            aria-label={"Close"}
          >
            &#x2715;
          </button>
        </div>
      </div>
    </>
  );
}
