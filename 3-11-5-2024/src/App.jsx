import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavbarWithStyle from "./components/NavbarWithStyle";
import HoverButton from "./components/button/HoverButton";

function App() {
  const [count, setCount] = useState(0);
  const listMenu = ["About Me", "FAQme", "LOGOUTme"];
  return (
    <>
      <NavbarWithStyle
        menu={listMenu}
        name="Zainal"
        age="1945"
        address="Hatinya tiara andini"
      />
      <NavbarWithStyle
        menu={["Saya", "kamu", "kamu"]}
        name="Tiara Andini "
        age="1946"
        address="a"
      />

      <HoverButton>
        <p>Teasdasdasdlasfnlaskfn</p>
      </HoverButton>
    </>
  );
}

export default App;
