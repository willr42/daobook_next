import Button from "@/components/Button";
import DashboardButton from "@/components/DashboardButton";
import StyledLink from "@/components/StyledLink";
import TitleLockup from "@/components/TitleLockup";
async function getData() {}

// TODO: this page should only route to /home or /login
export default async function Root() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center border-4 bg-primary p-24">
      <TitleLockup isSmall={true} isSubtitled={true} />
    </main>
  );
}
