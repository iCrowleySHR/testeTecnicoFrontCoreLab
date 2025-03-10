import React, { useState } from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { BsX } from "react-icons/bs";

interface NavbarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" />
        <h1>CoreNotes</h1>
      </div>

      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Pesquisar notas" 
          value={inputValue}
          onChange={handleSearchChange} 
        />
        <IoIosSearch size={20} className={styles.searchIcon} />
      </div>

      <div className={styles.closeButtonContainer}>
        <BsX size={45} />
      </div>
    </nav>
  );
};

export default Navbar;
