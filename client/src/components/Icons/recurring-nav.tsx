import * as React from "react";

interface RecurringIconProps {
  color?: string;         // Para cambiar el color
  width?: number | string; // Para cambiar el ancho
  height?: number | string; // Para cambiar la altura
}

const RecurringIcon: React.FC<RecurringIconProps> = ({
  color = "#b3b3b3",
  width = 20,
  height = 20,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    {...props}
  >
     <path
      fill={color}
      d="M18.25.51H1.75a1.5 1.5 0 0 0-1.5 1.5v14.25a.75.75 0 0 0 1.086.67L4 15.598l2.664 1.332a.75.75 0 0 0 .672 0L10 15.598l2.664 1.332a.75.75 0 0 0 .672 0L16 15.598l2.664 1.332a.75.75 0 0 0 1.086-.67V2.01a1.5 1.5 0 0 0-1.5-1.5zm-3.75 9.75h-9a.75.75 0 1 1 0-1.5h9a.75.75 0 1 1 0 1.5zm0-3h-9a.75.75 0 0 1 0-1.5h9a.75.75 0 1 1 0 1.5z"
    />
  </svg>
);

export default RecurringIcon;
