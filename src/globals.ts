interface UIProps {
  width?: number;
}

const defaultUIProps: UIProps = {
  width: 500,
};

// DYNAMIC PROPS (NEED TO BE IN ATOMS STORE FOR RECOIL]
const BoardColor = ["#D7C7FF", "#6D31FF"];

export type { UIProps };
export { defaultUIProps, BoardColor };
