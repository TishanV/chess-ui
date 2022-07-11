import React from "react";
import BootstrapButton from "react-bootstrap/Button";

type ButtonProps = {
  value: string;
  onClick: (e: MouseEvent | React.MouseEvent) => any;
};

type ToggleButtonProps = ButtonProps & {
  enable: boolean;
};

export const Button = {
  PRIMARY: (props: ButtonProps) => (
    <BootstrapButton variant="primary" onClick={props.onClick}>
      <label>{props.value}</label>
    </BootstrapButton>
  ),
  SECONDARY: (props: ButtonProps) => (
    <BootstrapButton variant="secondary" onClick={props.onClick}>
      <label>{props.value}</label>
    </BootstrapButton>
  ),
  RED: (props: ButtonProps) => (
    <BootstrapButton variant="danger" onClick={props.onClick}>
      <label>{props.value}</label>
    </BootstrapButton>
  ),
  TOGGLE: (props: ToggleButtonProps) => (
    <BootstrapButton
      variant={props.enable ? "primary" : "outline-primary"}
      onClick={props.onClick}
    >
      <label>{props.value}</label>
    </BootstrapButton>
  ),
};
