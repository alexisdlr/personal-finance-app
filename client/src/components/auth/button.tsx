import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ type = "button", className, ...props }) => {
  return (
    <button type={type} className={cn(className, `transition hover:opacity-75 duration-200 bg-grey-900 text-white py-4 rounded-lg`)} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
