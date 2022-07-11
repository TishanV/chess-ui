import React from "react"
const CardStyle: React.CSSProperties = {
  backgroundColor: "antiquewhite",
  borderRadius: 10,
  boxShadow: "0 0 5px black",
  position: "fixed",
  zIndex: 5,
};

type PopupCardProps = {
  position: [number, number];
  children: JSX.Element[] | JSX.Element;
};

export function PopupCard(props: PopupCardProps) {
  return (
    <div
      style={{ ...CardStyle, top: props.position[1], left: props.position[0] }}
    >
      {props.children}
    </div>
  );
}
