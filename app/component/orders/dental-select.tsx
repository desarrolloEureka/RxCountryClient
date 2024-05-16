"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
    onSelect?: (value: number[]) => void;
}

const DentalSelect = (props: Props) => {
    const { onSelect } = props;
    const [selected, setSelected] = useState<number[]>([]);

    const quadrant = (inicio: number) =>
        Array.from({ length: 8 }, (_, i) => inicio * 10 + 1 + i);

    useEffect(() => {
        if (onSelect) {
            onSelect(selected);
        }
    }, [onSelect, selected]);

    return (
        <div className="flex flex-row items-center space-x-10">
            <div className="">
                <span className="text-company-orange font-bold">DER</span>
            </div>
            <div className="flex flex-col items-center mx-auto">
                <div className="flex justify-center">
                    <div className="flex m-2">
                        {quadrant(1)
                            .reverse()
                            .map((tooth, index) => (
                                <div
                                    key={index}
                                    className="w-8 flex flex-col justify-between items-center cursor-pointer text-white"
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
                                            tooth >= 16 ? "w-9" : "w-5"
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
                                className="w-8 flex flex-col justify-between items-center cursor-pointer text-white"
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
                                    className={`${tooth >= 26 ? "w-9" : "w-5"}`}
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
                                    className="w-8 flex flex-col justify-between items-center cursor-pointer text-white"
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
                                            tooth >= 46 ? "w-9" : "w-5"
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
                                className="w-8 flex flex-col justify-between items-center cursor-pointer text-white"
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
                                    className={`${tooth >= 36 ? "w-9" : "w-5"}`}
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
            <div className="">
                <span className="text-company-orange font-bold">IZQ</span>
            </div>
        </div>
    );
};

export default DentalSelect;
