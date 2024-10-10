"use client"

import React from "react";
import { COLOR_DARK_TEXT, COLOR_DARK_BG, COLOR_LIGHT_TEXT, COLOR_LIGHT_BG } from "@/app/constants/colors";

const ComingSoon = () => {
    return (
        <div className={`w-full h-full flex flex-col items-center p-20 ease-in duration-300 ${COLOR_DARK_BG}`}>
            <div className="max-w-[1240px] m-auto flex flex-col justify-center items-center p-4 rounded-2xl">
                <h1 className={`text-4xl font-bold ${COLOR_LIGHT_TEXT}`}>Coming Soon</h1>
                <p className={`text-xl mt-4 ${COLOR_LIGHT_TEXT}`}>
                    We are working hard to bring you new features. Stay tuned!
                </p>
            </div>
        </div>
    );
};

export default ComingSoon;