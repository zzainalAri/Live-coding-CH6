import styles from "./NavbarWithStyle.module.css";
import About from "./about/About.jsx";

function NavbarWithStyle({ menu, name, age, address }) {
  let list;

  if (menu) {
    list = (
      <div>
        <ul className={styles.navList}>
          <li className={styles.navItem}>About Me</li>
          <li className={styles.navItem}>FAQ</li>
          <li className={styles.navItem}>Logout</li>
        </ul>
      </div>
    );
  } else {
    list = <h1>List not found</h1>;
  }

  return (
    <>
      <div>
        <div className={styles.navbar}>
          <h1 className={styles.title}>Hello FSW2</h1>
        </div>
        {list}
        <About name={name} age={age} address={address} />
      </div>
    </>
  );
}

export default NavbarWithStyle;
