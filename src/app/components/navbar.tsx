"use client"

import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { COLOR_DARK_TEXT, COLOR_LIGHT_BG } from "@/app/constants/colors";

const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className={`p-3 `}>
            <ul className="max-w-[1240px] m-auto flex items-center p-4 sticky">
                <li className="p-4">
                    <Button className={`${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold p-4 rounded-2xl`} onClick={
                        () => {
                            window.location.href = "/";
                        }
                    }>Home</Button>
                </li>
                <li className="p-4">
                    <Button className={`${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold p-4 rounded-2xl`} onClick={
                        () => {
                            window.location.href = "/pages/tasks";
                        }
                    }>Tasks</Button>
                </li>
                <li className="p-4">
                    <Button className={`${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold p-4 rounded-2xl`}  onClick={
                        () => {
                            window.location.href = "/pages/about";
                        }
                    }>About</Button>
                </li>
            </ul>

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