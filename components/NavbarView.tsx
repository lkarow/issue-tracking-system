import Link from "next/link";
import React from "react";

import styles from "../styles/NavbarView.module.css";

import useModal from "../hooks/useModal";
import AccessModal from "./AccessModal";

import { useSession } from "next-auth/react";

const NavbarView = () => {
  const [isShowingModal, toggleModal] = useModal();

  const handleActivateModal = () => toggleModal();

  const { status } = useSession();

  return (
    <>
      <AccessModal showModal={isShowingModal} onClose={toggleModal} />

      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/list">List</Link>
          </li>
          <li>
            <Link href="/board">Board</Link>
          </li>
        </ul>
        <div className={styles.alignRight}>
          <button className={styles.btn} onClick={handleActivateModal}>
            {status === "authenticated" ? "Online" : "Access"}
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavbarView;
