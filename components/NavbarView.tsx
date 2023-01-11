import Link from "next/link";

import styles from "../styles/NavbarView.module.css";

const NavbarView = () => {
  return (
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
    </nav>
  );
};

export default NavbarView;
