import Button, { ButtonProps } from "@material-ui/core/Button";
import clsx from "clsx";
import React, { forwardRef } from "react";
import {
  NavLink,
  NavLinkProps,
  useLocation,
  useResolvedLocation,
} from "react-router-dom";

type NavLinkButtonProps = ButtonProps & NavLinkProps;

const MyNavLink = forwardRef<HTMLAnchorElement | null, any>(function (
  props,
  ref,
) {
  const { primary, className, ...other } = props;
  const location = useLocation();
  const resolvedLocation = useResolvedLocation(props.to);
  const match =
    location.pathname.startsWith(resolvedLocation.pathname) && props.to !== "/";
  return (
    <NavLink
      {...other}
      className={clsx(className, match ? "active" : null)}
    />
  );
});

const NavLinkButton = function (props: NavLinkButtonProps) {
  return (
    <Button {...props} component={MyNavLink as any}>
      {props.children}
    </Button>
  );
};

export default NavLinkButton;
