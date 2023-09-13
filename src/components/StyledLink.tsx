import Link from "next/link";
import classNames from "classnames";

type StyledLinkProps = {
  linkText: string | undefined;
  href: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  className?: string;
};

const StyledLink = ({ linkText, href, replace, scroll, prefetch, className }: StyledLinkProps) => {
  const finalClassNames = classNames(
    "transition-color inline-block rounded-2xl border-2 border-slate-400 bg-slate-100 p-2 text-center font-sans font-semibold shadow-md ring-black/50 transition-transform hover:bg-slate-200 focus:ring active:scale-95 dark:border-white dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
    className
  );

  return (
    <Link
      className={finalClassNames}
      href={href}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
    >
      {linkText}
    </Link>
  );
};

export default StyledLink;
