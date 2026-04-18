import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link, type Link as LinkType } from "react-router-dom";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  to?: never;
  children: ReactNode;
  textOnly?: boolean;
};

type LinkProps = ComponentPropsWithoutRef<typeof LinkType> & {
  to?: string;
  children: ReactNode;
  textOnly?: boolean;
};

function isLinkComponent(props: ButtonProps | LinkProps): props is LinkProps {
  return "to" in props;
}

export default function Button(props: ButtonProps | LinkProps) {
  return isLinkComponent(props) ? (
    <Link {...props}>{props.children}</Link>
  ) : (
    <button {...props}>{props.children}</button>
  );
}
