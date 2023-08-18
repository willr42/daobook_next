import classNames from "classnames";

const ButtonColor = {
  primary:
    "border-primary bg-slate-100 focus:ring ring-primary/50 transition-color hover:bg-slate-200 dark:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700",
};

const everyButton =
  "border-4 rounded-2xl font-sans font-semibold shadow-md p-2 transition-transform active:scale-95";

const Button = ({ buttonText }) => {
  const finalStyles = classNames([everyButton, ButtonColor["primary"]]);

  return <button className={finalStyles}>{buttonText}</button>;
};

export default Button;
