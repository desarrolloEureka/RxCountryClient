"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    setSelected: (value: number[]) => void;
    selected: number[];
}

const DentalSelect = (props: Props) => {
    const { setSelected, selected } = props;
    // const [selected, setSelected] = useState<number[]>(selectedOptions || []);

    const quadrant = (inicio: number) =>
        Array.from({ length: 8 }, (_, i) => inicio * 10 + 1 + i);

    useEffect(() => {
        if (setSelected) {
            setSelected(selected);
        }
    }, [selected, setSelected]);

    // useEffect(() => {
    //     if (selectedOptions) {
    //         setSelected(selectedOptions);
    //     }
    // }, [selectedOptions]);

    return (
        <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-10 text-xs lg:text-base">
            <div className="flex lg:hidden justify-between w-full px-3">
                <span className="text-company-orange font-bold">DER</span>
                <span className="text-company-orange font-bold">IZQ</span>
            </div>
            <div className="hidden lg:flex">
                <span className="text-company-orange font-bold">DER</span>
            </div>
            <div className="flex flex-col items-center mx-1 sm:mx-auto">
                <div className="flex justify-center">
                    <div className="flex m-2">
                        {quadrant(1)
                            .reverse()
                            .map((tooth, index) => (
                                <div
                                    key={index}
                                    className="w-[18px] lg:w-8 flex flex-col justify-between items-center cursor-pointer text-white"
                                    onClick={() => {
                                        if (selected?.includes(tooth)) {
                                            const remove = selected.filter(
                                                (item) => item !== tooth,
                                            );
                                            setSelected([...remove]);
                                        } else {
                                            setSelected([...selected, tooth]);
                                        }
                                    }}
                                >
                                    <span
                                        className={`${
                                            selected?.includes(tooth)
                                                ? "text-company-blue "
                                                : "text-white"
                                        }`}
                                    >
                                        {tooth}
                                    </span>
                                    <Image
                                        className={`${
                                            tooth >= 16
                                                ? "w-6 lg:w-9"
                                                : "w-3 lg:w-5"
                                        }`}
                                        src={`/assets/teeth/${tooth}.svg`}
                                        style={{
                                            filter: `${
                                                selected?.includes(tooth)
                                                    ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                                    : ""
                                            }`,
                                        }}
                                        width="0"
                                        height="0"
                                        alt={"tooth icon"}
                                    />
                                </div>
                            ))}
                    </div>
                    <div className="h-22 w-[0.125rem] bg-white" />
                    <div className="flex m-2">
                        {quadrant(2).map((tooth, index) => (
                            <div
                                key={index}
                                className="w-[18px] lg:w-8 flex flex-col justify-between items-center cursor-pointer text-white"
                                onClick={() => {
                                    if (selected?.includes(tooth)) {
                                        const remove = selected.filter(
                                            (item) => item !== tooth,
                                        );
                                        setSelected([...remove]);
                                    } else {
                                        setSelected([...selected, tooth]);
                                    }
                                }}
                            >
                                <span
                                    className={`${
                                        selected?.includes(tooth)
                                            ? "text-company-blue "
                                            : "text-white"
                                    }`}
                                >
                                    {tooth}
                                </span>
                                <Image
                                    className={`${
                                        tooth >= 26
                                            ? "w-6 lg:w-9"
                                            : "w-3 lg:w-5"
                                    }`}
                                    src={`/assets/teeth/${tooth}.svg`}
                                    style={{
                                        filter: `${
                                            selected?.includes(tooth)
                                                ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                                : ""
                                        }`,
                                    }}
                                    width="0"
                                    height="0"
                                    alt={"tooth icon"}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full h-[0.1rem] bg-white" />
                <div className="flex justify-center">
                    <div className="flex m-2">
                        {quadrant(4)
                            .reverse()
                            .map((tooth, index) => (
                                <div
                                    key={index}
                                    className="w-[18px] lg:w-8 flex flex-col justify-between items-center cursor-pointer text-white"
                                    onClick={() => {
                                        if (selected?.includes(tooth)) {
                                            const remove = selected.filter(
                                                (item) => item !== tooth,
                                            );
                                            setSelected([...remove]);
                                        } else {
                                            setSelected([...selected, tooth]);
                                        }
                                    }}
                                >
                                    <Image
                                        className={`${
                                            tooth >= 46
                                                ? "w-6 lg:w-9"
                                                : "w-3 lg:w-5"
                                        }`}
                                        src={`/assets/teeth/${tooth}.svg`}
                                        style={{
                                            filter: `${
                                                selected?.includes(tooth)
                                                    ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                                    : ""
                                            }`,
                                        }}
                                        width="0"
                                        height="0"
                                        alt={"tooth icon"}
                                    />
                                    <span
                                        className={`${
                                            selected?.includes(tooth)
                                                ? "text-company-blue "
                                                : "text-white"
                                        }`}
                                    >
                                        {tooth}
                                    </span>
                                </div>
                            ))}
                    </div>
                    <div className="h-22 w-[0.125rem] bg-white" />
                    <div className="flex m-2">
                        {quadrant(3).map((tooth, index) => (
                            <div
                                key={index}
                                className="w-[18px] lg:w-8 flex flex-col justify-between items-center cursor-pointer text-white"
                                onClick={() => {
                                    if (selected?.includes(tooth)) {
                                        const remove = selected.filter(
                                            (item) => item !== tooth,
                                        );
                                        setSelected([...remove]);
                                    } else {
                                        setSelected([...selected, tooth]);
                                    }
                                }}
                            >
                                <Image
                                    className={`${
                                        tooth >= 36
                                            ? "w-6 lg:w-9"
                                            : "w-3 lg:w-5"
                                    }`}
                                    src={`/assets/teeth/${tooth}.svg`}
                                    style={{
                                        filter: `${
                                            selected?.includes(tooth)
                                                ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                                : ""
                                        }`,
                                    }}
                                    width="0"
                                    height="0"
                                    alt={"tooth icon"}
                                />
                                <span
                                    className={`${
                                        selected?.includes(tooth)
                                            ? "text-company-blue "
                                            : "text-white"
                                    }`}
                                >
                                    {tooth}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden lg:flex">
                <span className="text-company-orange font-bold">IZQ</span>
            </div>
        </div>
    );
};

export default DentalSelect;
