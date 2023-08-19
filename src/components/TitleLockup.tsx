type TitleLockupProps = {
  isSubtitled: boolean;
  isSmall: boolean;
};

const TitleLockup = ({ isSubtitled, isSmall }: TitleLockupProps) => {
  let headingSize;
  if (isSmall) {
    headingSize = "text-7xl";
  } else {
    headingSize = "text-8xl";
  }

  return (
    <div className="text-center text-white dark:text-black">
      <p className={"font-italiana " + headingSize}>Dao Book</p>
      {isSubtitled && <p className="text-2xl">The way of clinic notes</p>}
    </div>
  );
};

export default TitleLockup;
