import * as React from "react";

interface TransactionsIconProps {
  color?: string;         // Para cambiar el color
  width?: number | string; // Para cambiar el ancho
  height?: number | string; // Para cambiar la altura
}

const TransactionsIcon: React.FC<TransactionsIconProps> = ({
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
      d="M8.193 12.973a.75.75 0 0 1-.162.818l-3 3a.748.748 0 0 1-1.062 0l-3-3A.75.75 0 0 1 1.5 12.51h2.25V1.26a.75.75 0 0 1 1.5 0v11.25H7.5a.75.75 0 0 1 .693.463zM17.03 3.73l-3-3a.749.749 0 0 0-1.061 0l-3 3a.75.75 0 0 0 .53 1.281h2.25v11.25a.75.75 0 1 0 1.5 0V5.01h2.25a.75.75 0 0 0 .53-1.28z"
    />
  </svg>
);

export default TransactionsIcon;
