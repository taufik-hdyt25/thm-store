import { Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ITextLink } from "./TextLink.type";

const TextLink: React.FC<ITextLink> = ({
  title,
  link,
  children,
  ...props
}): JSX.Element => {
  return (
    <Link href={link} as={NextLink} {...props}>
      {title}
      {children}
    </Link>
  );
};

export default React.memo(TextLink);
