function HoverButton({ children, onSelect }) {
  // document.querySelector("button").addEventListener("click", () => {
  //   console.log("halo");
  // });

  return (
    <li>
      <button onClick={onSelect}>{children}</button>
    </li>
  );
}

export default HoverButton;
