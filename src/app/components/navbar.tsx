"use client"

import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import {COLOR_DARK_BG, COLOR_DARK_TEXT, COLOR_LIGHT_BG, COLOR_LIGHT_TEXT} from "@/app/constants/colors";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className={`p-3 `}>
            <Dropdown className={`p-4 text-center items-center justify-center rounded-2xl ${COLOR_DARK_BG} ${COLOR_LIGHT_TEXT} font-bold`}>
                <DropdownTrigger>
                    <Button variant="bordered" className={`text-center items-center rounded-2xl p-4 ${COLOR_DARK_BG} ${COLOR_LIGHT_TEXT} font-bold`}><AiOutlineMenu/></Button>
                </DropdownTrigger>
                <DropdownMenu className="p-4">
                    <DropdownItem key="home" className="text-center p-4">
                        <Button className={'home-button'} onClick={
                            () => {
                                window.location.href = "/";
                            }
                        }>Home</Button>
                    </DropdownItem>
                    <DropdownItem key="tasks">
                        <Button className={`tasks-button p-4`} onClick={
                            () => {
                                window.location.href = "/pages/tasks";
                            }
                        }>Tasks</Button>
                    </DropdownItem>
                    <DropdownItem key="calculator">
                        <Button className={`tasks-button p-4`} onClick={
                            () => {
                                window.location.href = "/pages/calculator";
                            }
                        }>Calculator</Button>
                    </DropdownItem>
                    <DropdownItem key="about">
                        <Button className={`about-button p-4`}  onClick={
                            () => {
                                window.location.href = "/pages/about";
                            }
                        }>About</Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>


            <div className="block sm:hidden z-10" onClick={handleNav}>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <div
                className={
                    nav
                        ? `sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300 ${COLOR_LIGHT_BG}`
                        : `sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen text-center ease-in duration-300 ${COLOR_LIGHT_BG}`
                }
            >
                <ul>
                    <li className="p-4">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-4"></li>
                    <li className="p-4">
                        <Link href="/about">About</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;