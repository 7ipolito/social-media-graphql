"use client";
import React, { useEffect, useState } from "react";
import { SignOutButton, useAuth, UserButton } from "@clerk/nextjs";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { IoLogOutOutline } from "react-icons/io5";
import { Tooltip } from "@heroui/tooltip";

const NavBar = () => {
  const [isUserButtonVisible, setUserButtonVisible] = useState(false);
  const { signOut } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUserButtonVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Navbar
      className="bg-navbarColor h-20"
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
        <Image
          src={"/logo.png"}
          width={60}
          height={60}
          alt={"Logo"}
          className="transition-all duration-300 transform hover:scale-105"
        />
        <p className="font-bold text-inherit text-white transition-all duration-300 transform hover:scale-105">
          SocialMediaGraphQl
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem
          isActive
          className="transition-all duration-300 transform hover:scale-105 hover:text-primary"
        >
          <Link href="#" className="text-white">
            Feed
          </Link>
        </NavbarItem>

        <div
          className={`${
            isUserButtonVisible ? "opacity-100" : "opacity-0 translate-y-4"
          } transition-all duration-500 ease-out`}
        >
          <div className="flex flex-row text-white justify-center items-center">
            <div className="pr-2">
              <UserButton />
            </div>
            <Tooltip content="End session" showArrow={true}>
              <NavbarItem className="transition-all duration-300 transform hover:scale-105 hover:text-primary cursor-pointer">
                <button onClick={() => signOut()}>
                  <SignOutButton redirectUrl="/">
                    <IoLogOutOutline color="#D72638" size={35} />
                  </SignOutButton>
                </button>
              </NavbarItem>
            </Tooltip>
          </div>
        </div>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
