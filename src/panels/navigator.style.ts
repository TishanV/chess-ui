const navControlStaticStyle = {
  margin: "0 2px",
  height: 24,
  filter: "invert(100%)",
  cursor: "pointer",
};

export const navigatorStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#38383b",
  height: 40,
};

export const navControlStyles = {
  BASE: navControlStaticStyle,
  OTHER: { margin: "0 4px", height: 20 },
  UNDO: { height: 15 },
};

// type navStyleProps = {
//     height: number
// }

// export const navControlStyle = (props: navStyleProps) => ({
//     ...navControlStyle,
//     height: props.height
// })
