import classNames from "classnames";
import { MouseEventHandler } from "react";

type ButtonProps = {
  buttonText: string;
  buttonTheme?: "primary" | "outline";
  buttonType: "submit" | "reset" | "button";
  onClick?: MouseEventHandler;
  disabled: boolean;
};

const ButtonColor = {
  primary:
    "border-primary bg-slate-100 ring-primary/50 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
  outline:
    "border-black bg-slate-100 ring-black/50 hover:bg-slate-200 dark:border-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
};

const everyButton =
  "border-4 rounded-2xl font-sans font-semibold shadow-md p-2 focus:ring transition active:scale-95 disabled:border-slate-200 disabled:cursor-default disabled:pointer-events-none";

const Button = ({ buttonText, buttonTheme, onClick, buttonType, disabled }: ButtonProps) => {
  if (!buttonTheme) {
    buttonTheme = "primary";
  }

  const finalStyles = classNames([everyButton, ButtonColor[buttonTheme]]);

  return (
    <button className={finalStyles} onClick={onClick} type={buttonType} disabled={disabled}>
      {buttonText}
    </button>
  );
};

export default Button;
