import React from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { BsX } from "react-icons/bs";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
        <h1>CoreNotes</h1>
      </div>

      <div className={styles.searchContainer}>
        <input type="text" placeholder="Pesquisar notas" />
        <IoIosSearch size={20} className={styles.searchIcon} />
      </div>

      <div className={styles.closeButtonContainer}>
        <BsX size={45} />
      </div>
    </nav>
  );
};

export default Navbar;
