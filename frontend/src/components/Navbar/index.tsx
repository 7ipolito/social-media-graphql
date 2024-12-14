import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

import React from "react";
import { UserButton } from "@clerk/nextjs";

const NavBar = () => {
  return (
    <Navbar
      className="bg-navbarColor"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
        ],
      }}
    >
      <NavbarBrand>
        <Image src={"/logo.png"} width={60} height={60} alt={"Logo"} />
        <p className="font-bold text-inherit text-white">SocialMediaGraphQl</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem isActive>
          <Link href="#" className="text-white">
            Feed
          </Link>
        </NavbarItem>
        <UserButton />
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
