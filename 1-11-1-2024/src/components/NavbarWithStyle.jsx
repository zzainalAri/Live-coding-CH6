import styles from "./NavbarWithStyle.module.css";

function NavbarWithStyle() {
  return (
    <div className={styles.navbar}>
      <h1 className={styles.title}>Hello FSW2</h1>
      <ul className={styles.navList}>
        <li className={styles.navItem}>About Me</li>
        <li className={styles.navItem}>FAQ</li>
        <li className={styles.navItem}>Logout</li>
      </ul>
    </div>
  );
}

export default NavbarWithStyle;
