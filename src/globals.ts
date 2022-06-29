interface UIProps {
  width?: number;
}

const defaultUIProps: UIProps = {
  width: 500,
};

// DYNAMIC PROPS (NEED TO BE IN ATOMS STORE FOR RECOIL]
const BoardColor = ["#D7C7FF", "#6D31FF"]; // White, Black
const scoreColor = ["#62626D", "#7976FF"]; // Unselected, Selected

export type { UIProps };
export { defaultUIProps, BoardColor, scoreColor };
