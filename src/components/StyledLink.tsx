import Link from "next/link";

type StyledLinkProps = {
  linkText: string;
  href: string;
  replace: boolean;
  scroll: boolean;
  prefetch: boolean;
};

const StyledLink = ({ linkText, href, replace, scroll, prefetch }: StyledLinkProps) => {
  return (
    <Link
      className="border-4 rounded-2xl font-sans font-semibold shadow-md p-2 focus:ring transition-transform active:scale-95 border-black bg-slate-100 ring-black/50 transition-color hover:bg-slate-200 dark:border-white dark:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
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
