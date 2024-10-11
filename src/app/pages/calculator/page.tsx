"use client"

import React, { useState } from "react";
import { evaluate, create, all } from "mathjs";
import { COLOR_DARK_TEXT, COLOR_DARK_BG, COLOR_LIGHT_TEXT, COLOR_LIGHT_BG, COLOR_MEDIUM_TEXT, COLOR_MEDIUM_BG } from "@/app/constants/colors";
import { AiFillDelete } from "react-icons/ai";

// Create a mathjs instance with custom functions
const math = create(all);
math.import({
    frac: (x: number) => (y: number) => x / y
});

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [history, setHistory] = useState<string[]>([]);

    const handleButtonClick = (value: string) => {
        setInput(input + value);
        setResult(""); // Clear result when input changes
    };

    const handleClear = () => {
        setInput("");
        setResult("");
    };

    const handleCalculate = () => {
        try {
            const res = math.evaluate(input.replace(/\s+/g, "")).toString(); // Remove spaces before evaluating
            setResult(res);
            const newHistory = [...history, `${input} = ${res}`];
            if (newHistory.length > 10) {
                newHistory.shift();
            }
            setHistory(newHistory);
        } catch {
            setResult("Err!");
        }
    };

    const handleClearHistory = () => {
        setHistory([]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value.replace(/\s+/g, ""));
        setResult(""); // Clear result when input changes
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            setInput(input.slice(0, -1));
            setResult(""); // Clear result when input changes
        } else if (e.key === "Enter") {
            handleCalculate();
        }
    };

    const renderButtons = (buttons: string[]) => {
        const columns = [];
        for (let i = 0; i < buttons.length; i += 5) {
            const column = buttons.slice(i, i + 5);
            columns.push(
                <div key={i} className="flex flex-col mb-4 gap-2">
                    {column.map((value) => (
                        <button
                            key={value}
                            onClick={() => handleButtonClick(value)}
                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl flex items-center justify-center w-20 h-20`}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            );
        }
        return columns;
    };

    return (
        <div className={`w-full h-full flex flex-col items-center p-20 ease-in duration-300 ${COLOR_DARK_BG}`}>
            <div className="max-w-[1600px] m-auto flex flex-col justify-center items-center p-4 rounded-2xl">
                <h1 className={`text-4xl font-bold ${COLOR_LIGHT_TEXT}`}>Calculator</h1>
                <div className="w-full max-w-6xl mt-4 p-3 w-100 flex">
                    <div className={`w-1/2 ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl p-10 flex flex-col justify-between`}>
                        <div>
                            <h2 className={`text-2xl font-bold ${COLOR_DARK_TEXT}`}>History</h2>
                            <ul className="list-disc pl-5">
                                {history.map((entry, index) => (
                                    <li key={index} className={`text-xl ${COLOR_DARK_TEXT}`}>{entry}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            onClick={handleClearHistory}
                            className={`mt-4 p-2 text-xl font-bold ${COLOR_DARK_BG} ${COLOR_LIGHT_TEXT} rounded-2xl p-10self-center flex items-center justify-center`}
                        >
                            <AiFillDelete />
                        </button>
                    </div>
                    <div className="p-4"></div>
                    <div className="w-3/4">
                        <input
                            type="text"
                            placeholder="Input..."
                            value={`${input} ${(result !== "") ? `= ${result}` : ""}`}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className={`w-full p-4 text-xl ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl mb-4`}
                        />
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    {["^", "(", ")", "pi", "e"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_TEXT} ${COLOR_MEDIUM_BG} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["sin", "cos", "tan", "log", "log2"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_TEXT} ${COLOR_MEDIUM_BG} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["ln", "round", "sqrt", "exp", "frac"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_TEXT} ${COLOR_MEDIUM_BG} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["atan", "abs", "cbrt", "ceil", "floor"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_TEXT} ${COLOR_MEDIUM_BG} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["sinh", "cosh", "tanh", "asinh", "asin"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_TEXT} ${COLOR_MEDIUM_BG} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2">
                                    {["C", "+/-", "%", "/"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => value === "C" ? handleClear() : handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["7", "8", "9", "*"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["4", "5", "6", "-"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {["1", "2", "3", "+"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    {[".", "0"].map((value) => (
                                        <button
                                            key={value}
                                            onClick={() => handleButtonClick(value)}
                                            className={`p-6 text-2xl font-bold ${COLOR_LIGHT_BG} ${COLOR_DARK_TEXT} rounded-2xl flex items-center justify-center w-20 h-20`}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                    <button
                                        onClick={handleCalculate}
                                        className={`p-6 text-2xl font-bold ${COLOR_MEDIUM_BG} ${COLOR_LIGHT_TEXT} rounded-2xl flex items-center justify-center w-40 h-20`}
                                    >
                                        =
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;