import * as React from "react";

interface PotsIconProps {
  color?: string;         // Para cambiar el color
  width?: number | string; // Para cambiar el ancho
  height?: number | string; // Para cambiar la altura
}

const PotsIcon: React.FC<PotsIconProps> = ({
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
      d="M14.25 3.336V1.76a1.5 1.5 0 0 0-1.5-1.5h-7.5a1.5 1.5 0 0 0-1.5 1.5v1.576a3.755 3.755 0 0 0-3 3.674v10.5a3.75 3.75 0 0 0 3.75 3.75h9a3.75 3.75 0 0 0 3.75-3.75V7.01a3.755 3.755 0 0 0-3-3.674zm-6-1.576h1.5v1.5h-1.5zm-3 0h1.5v1.5h-1.5zm4.5 14.25v.75a.75.75 0 1 1-1.5 0v-.75H7.5a.75.75 0 1 1 0-1.5h2.25a.75.75 0 1 0 0-1.5h-1.5a2.25 2.25 0 1 1 0-4.5v-.75a.75.75 0 0 1 1.5 0v.75h.75a.75.75 0 1 1 0 1.5H8.25a.75.75 0 1 0 0 1.5h1.5a2.25 2.25 0 0 1 0 4.5zm3-12.75h-1.5v-1.5h1.5z"
    />
  </svg>
);

export default PotsIcon;
