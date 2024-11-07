import * as React from "react";

interface OverviewIconProps {
  color?: string;         // Para cambiar el color
  width?: number | string; // Para cambiar el ancho
  height?: number | string; // Para cambiar la altura
}

const OverviewIcon: React.FC<OverviewIconProps> = ({
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
      d="M18 8.593v8.667a1.5 1.5 0 0 1-1.5 1.5h-3.75a1.5 1.5 0 0 1-1.5-1.5v-3.75a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v3.75a1.5 1.5 0 0 1-1.5 1.5H1.5a1.5 1.5 0 0 1-1.5-1.5V8.593a1.5 1.5 0 0 1 .485-1.105l7.5-7.076.01-.01a1.5 1.5 0 0 1 2.029.01l7.5 7.076A1.5 1.5 0 0 1 18 8.593z"
    />
  </svg>
);

export default OverviewIcon;
