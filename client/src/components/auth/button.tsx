
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit";
  classname?: string;
};

const Button: React.FC<ButtonProps> = ({ type = "button", classname, ...props }) => {
  return (
    <button type={type} className={classname} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
