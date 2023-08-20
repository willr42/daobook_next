import StyledLink from "./StyledLink";
import LogoutButton from "./LogoutButton";

const DoctorHeader = () => {
  return (
    <header className="flex flex-col place-content-between items-center bg-primary p-6 md:flex-row">
      <div className="inline-flex">
        <StyledLink linkText="Home" href="/home" />
        <LogoutButton />
      </div>
    </header>
  );
};

export default DoctorHeader;
