"use client"

import React from "react";
import { COLOR_DARK_TEXT, COLOR_DARK_BG, COLOR_LIGHT_TEXT, COLOR_LIGHT_BG } from "@/app/constants/colors";

const About = () => {
    return (
        <div className={`w-full h-full flex flex-col items-center p-20 ease-in duration-300 ${COLOR_DARK_BG}`}>
            <div className="max-w-[1240px] m-auto flex flex-col justify-center items-center p-4 rounded-2xl">
                <h1 className={`text-4xl font-bold ${COLOR_LIGHT_TEXT}`}>About Us</h1>
                <p className={`text-xl mt-4 ${COLOR_LIGHT_TEXT}`}>
                    Welcome to our application! We are dedicated to providing the best experience for our users.
                </p>
                <p className={`text-xl mt-4 ${COLOR_LIGHT_TEXT}`}>
                    Our team is passionate about creating high-quality software that meets your needs.
                </p>
            </div>
        </div>
    );
};

export default About;