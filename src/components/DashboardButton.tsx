import { MouseEventHandler } from "react";

type DashButtonProps = {
  buttonText: string;
  onClick: MouseEventHandler;
};

const DashboardButton = ({ buttonText, onClick }: DashButtonProps) => {
  return (
    <button className="h-56 max-w-[220px] rounded-2xl border-4 border-primary bg-slate-50 p-10 text-center text-3xl font-semibold shadow-md ring-primary/50 transition-colors transition-transform hover:bg-slate-200 focus:ring active:scale-95">
      {buttonText}
    </button>
  );
};

export default DashboardButton;
