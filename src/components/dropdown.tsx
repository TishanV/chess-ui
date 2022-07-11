import React from "react"
import BootstrapDropdown from "react-bootstrap/Dropdown";

type DropdownProps = {
  placeholder?: string;
  selectedIndex?: number;
  list: string[];
  onChange: (i: number) => any;
  style?: React.CSSProperties;
};

export function Dropdown(props: DropdownProps) {
  return (
    <BootstrapDropdown style={props.style}>
      <BootstrapDropdown.Toggle
        variant="secondary"
        style={{ width: props.style?.width }}
      >
        <label>
          {props.list[props.selectedIndex ?? -1] ?? props.placeholder}
        </label>
      </BootstrapDropdown.Toggle>
      <BootstrapDropdown.Menu
        variant="dark"
        style={{ width: props.style?.width }}
      >
        {props.list.map((item, i) => (
          <BootstrapDropdown.Item
            key={i}
            active={i == props.selectedIndex}
            onClick={(_) => props.onChange(i)}
          >
            <label>{item}</label>
          </BootstrapDropdown.Item>
        ))}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
}
