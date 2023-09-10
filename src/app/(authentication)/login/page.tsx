import Input from "@/components/Input";
import TitleLockup from "@/components/TitleLockup";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-primary p-12 sm:p-24">
        <TitleLockup isSmall={true} isSubtitled={true} />
      </div>
      <LoginForm />
    </>
  );
}
