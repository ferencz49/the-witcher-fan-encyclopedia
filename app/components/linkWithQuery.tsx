import { Link, NavLink, useLocation } from "react-router";
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export function LinkWithQuery({ children, to, ...props }: PropsWithChildren<ComponentPropsWithoutRef<typeof Link>>) {
  let { search } = useLocation();
  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
}

export function NavLinkWithQuery({ children, to, ...props }: PropsWithChildren<ComponentPropsWithoutRef<typeof NavLink>>) {
  let { search } = useLocation();
  return (
    <NavLink to={to + search} {...props}>
      {children}
    </NavLink>
  );
}
