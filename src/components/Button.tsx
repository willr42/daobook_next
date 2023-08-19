import classNames from "classnames";

const ButtonColor = {
  primary:
    "border-primary bg-slate-100 ring-primary/50 transition-color hover:bg-slate-200 dark:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700",
  outline:
    "border-black bg-slate-100 ring-black/50 transition-color hover:bg-slate-200 dark:border-white dark:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700",
};

const everyButton =
  "border-4 rounded-2xl font-sans font-semibold shadow-md p-2 focus:ring transition-transform active:scale-95";

const Button = ({ buttonText, buttonTheme }) => {
  if (!buttonTheme) {
    buttonTheme = "primary";
  }

  const finalStyles = classNames([everyButton, ButtonColor[buttonTheme]]);

  return <button className={finalStyles}>{buttonText}</button>;
};

export default Button;
