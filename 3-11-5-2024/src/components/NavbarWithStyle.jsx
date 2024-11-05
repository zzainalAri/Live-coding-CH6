import { useState } from "react";
import styles from "./NavbarWithStyle.module.css";
import About from "./about/About.jsx";
import HoverButton from "./button/HoverButton.jsx";

function NavbarWithStyle({ menu, name, age, address }) {
  let list;
  // let biodata = {};
  const [biodata, setBiodata] = useState({});

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

  function handleTriggerSelect(selectedStudent) {
    console.log(" ketriggers " + selectedStudent);
    setBiodata({
      ...biodata,
      name,
      age,
      address,
    });
  }

  return (
    <>
      {/* {modal component} */}
      <div className={styles.overlay} onClick={""}>
        <div className={styles.modal}>
          {/* <button className={styles.closeButton} onClick={""}>
            &times;
          </button> */}
          <div className={styles.content}>
            Biodata : {biodata.name} {biodata.age} {biodata.address}
          </div>
        </div>
      </div>
      <div>
        {/* Modal COmponent */}
        <div className={styles.navbar}>
          <h1 className={styles.title}>Hello FSW2</h1>
        </div>
        {list}
      </div>
      <About name={name} age={age} address={address} />
      <HoverButton onSelect={() => handleTriggerSelect(name)}>
        Click ME !
      </HoverButton>
    </>
  );
}

export default NavbarWithStyle;
