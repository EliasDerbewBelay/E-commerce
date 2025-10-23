import { ButtonProps } from "@/interface";

const Button: React.FC<ButtonProps> = ({ title, style }) => {
  return <button className={style}>{title}</button>;
};

export default Button;
