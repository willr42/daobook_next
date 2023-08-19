import Button from "@/components/Button";
import StyledLink from "@/components/StyledLink";
import TitleLockup from "@/components/TitleLockup";
async function getData() {}

// TODO: this page should only route to /home or /login
export default async function Root() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 border-4 bg-yellow-50">
      <div className="">Hello there</div>
      <Button buttonText="Hello there" />
      <StyledLink linkText="Hello there" href="." />
      <TitleLockup isSubtitled={false} isSmall={false}></TitleLockup>
    </main>
  );
}
