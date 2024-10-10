"use client"

import React, { useEffect, useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { AiOutlinePlayCircle, AiOutlinePauseCircle, AiOutlineReload, AiOutlineSelect, AiOutlinePlaySquare } from 'react-icons/ai';
import { COLOR_DARK_TEXT, COLOR_DARK_BG, COLOR_LIGHT_TEXT, COLOR_LIGHT_BG } from "@/app/constants/colors";

enum TimerFormat {
    DETAILED = "DETAILED",
    COMPACT = "COMPACT",
    VERY_COMPACT = "VERY_COMPACT"
}

const Timer = () => {
    const [timeUp, setTimeUp] = useState(false);
    const [format, setFormat] = useState(TimerFormat.COMPACT);
    const [duration, setDuration] = useState(25);
    const [customDuration, setCustomDuration] = useState('');
    const [onBreak, setOnBreak] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
    const [remainingTime, setRemainingTime] = useState(duration * 60000);

    useEffect(() => {
        setRemainingTime(duration * 60000);
    }, [duration]);

    const formatTime = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = hours > 0 ? `${hours}h ` : '';
        const formattedMinutes = minutes > 0 ? `${minutes}m ` : '';
        const formattedSeconds = `${seconds}s`;

        switch (format) {
            case TimerFormat.DETAILED:
                return `${hours > 0 ? `${hours} Hours ` : ''}${minutes > 0 ? `${minutes} Minutes ` : ''}${seconds} Seconds`;
            case TimerFormat.COMPACT:
                return `${formattedHours}${formattedMinutes}${formattedSeconds}`.trim();
            case TimerFormat.VERY_COMPACT:
                return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            default:
                return '';
        }
    };

    const updateTimerDisplay = (duration: number) => {
        setRemainingTime(duration * 60000);
    };

    useEffect(() => {
        if (isRunning) {
            let target = new Date(new Date().getTime() + remainingTime);

            const interval = setInterval(() => {
                const now = new Date();
                const difference = target.getTime() - now.getTime();
                setRemainingTime(difference);

                if (difference <= 0) {
                    if (onBreak) {
                        setTimeUp(true);
                        clearInterval(interval);
                    } else {
                        setOnBreak(true);
                        target = new Date(new Date().getTime() + 5 * 60000);
                    }
                }
            }, 1000);

            setIntervalId(interval);

            return () => clearInterval(interval);
        }
    }, [isRunning, remainingTime, onBreak]);

    const handleCustomDuration = () => {
        const customDurationNumber = parseInt(customDuration, 10);
        if (!isNaN(customDurationNumber) && customDurationNumber > 0) {
            setDuration(customDurationNumber);
            updateTimerDisplay(customDurationNumber);
        }
    };

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
        if (intervalId !== null) clearInterval(intervalId);
    };

    const handleResume = () => {
        setIsRunning(true);
    };

    const handleReset = () => {
        setIsRunning(false);
        if (intervalId !== null) clearInterval(intervalId);
        setTimeUp(false);
        setOnBreak(false);
        updateTimerDisplay(duration);
    };

    const handleSetDuration = (duration: number) => {
        setDuration(duration);
        updateTimerDisplay(duration);
    };

    return (
        <div className={`w-full h-full flex flex-col items-center p-20 ease-in duration-300 ${COLOR_DARK_BG}`}>
            <div className="max-w-[1240px] m-auto flex flex-col justify-center items-center p-4 rounded-2xl">
                <div className="flex-grow"></div>
                <div className={`timer-wrapper text-2xl p-10 grid grid-cols-1 items-center justify-center bg-center bg-cover rounded-2xl`}>
                    {timeUp ? (
                        <h1 className={`text-7xl font-bold ${COLOR_LIGHT_TEXT}`}>Time is up</h1>
                    ) : onBreak ? (
                        <>
                            <h1>Break</h1>
                            <div className="timer-segment">
                                <span className="time">
                                    {formatTime(remainingTime)}
                                </span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={`timer-segment text-7xl font-bold ${COLOR_LIGHT_TEXT}`}>
                                {formatTime(remainingTime)}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex-grow"></div>
            </div>
            <footer className={`fixed bottom-0 left-0 w-full p-5`}>
                <div className="flex justify-center space-x-4 mb-4">
                    <Button onClick={handleStart} className={`rounded-2xl p-4 ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>
                        <AiOutlinePlayCircle size={24}/>
                    </Button>
                    <Button onClick={handleResume} className={`rounded-2xl p-4 ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>
                        <AiOutlinePlaySquare size={24}/>
                    </Button>
                    <Button onClick={handlePause} className={`rounded-2xl p-4 ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>
                        <AiOutlinePauseCircle size={24}/>
                    </Button>
                    <Button onClick={handleReset} className={`rounded-2xl p-4 ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>
                        <AiOutlineReload size={24}/>
                    </Button>

                    <div className="w-20"></div>

                    <Dropdown className={`p-4 text-center items-center justify-center rounded-2xl ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>
                        <DropdownTrigger>
                            <Button variant="bordered" className={`text-center items-center rounded-2xl p-4 ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>Timer style</Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem key="detailed" className="text-center">
                                <button onClick={() => setFormat(TimerFormat.DETAILED)} className="p-3 text-center">Detailed</button>
                            </DropdownItem>
                            <DropdownItem key="compact">
                                <button onClick={() => setFormat(TimerFormat.COMPACT)} className="p-3 text-center">Compact</button>
                            </DropdownItem>
                            <DropdownItem key="very-compact">
                                <button onClick={() => setFormat(TimerFormat.VERY_COMPACT)} className="p-3">Very Compact</button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className={`p-4 text-center items-center justify-center rounded-2xl ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>
                        <DropdownTrigger>
                            <Button variant="bordered" className={`text-center items-center rounded-2xl p-4 ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold`}>Select Duration</Button>
                        </DropdownTrigger>
                        <DropdownMenu className="p-4 font-bold">
                            <DropdownItem key="25-mins" className="text-center">
                                <button onClick={() => handleSetDuration(25)} className="p-3">25m</button>
                            </DropdownItem>
                            <DropdownItem key="50-mins">
                                <button onClick={() => handleSetDuration(50)} className="p-3">50m</button>
                            </DropdownItem>
                            <DropdownItem key="100-mins">
                                <button onClick={() => handleSetDuration(100)} className="p-3">100m</button>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div className="w-20"></div>
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={customDuration}
                            onChange={(e) => setCustomDuration(e.target.value)}
                            placeholder="Input (mins)"
                            className={`p-4 rounded ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold rounded-2xl`}
                        />
                        <Button onClick={handleCustomDuration} className={`ml-2 p-4 flex ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} font-bold rounded-2xl`}>
                            <AiOutlineSelect size={24}/>
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Timer;