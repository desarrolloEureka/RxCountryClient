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
                                    style={{
                                        filter: `${
                                            selected?.includes(tooth)
                                                ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                                : ""
                                        }`,
                                    }}
                                    src={`/assets/teeth/${tooth}.svg`}
                                    width={tooth >= 16 ? 35 : 20}
                                    height={0}
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
                                style={{
                                    filter: `${
                                        selected?.includes(tooth)
                                            ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                            : ""
                                    }`,
                                }}
                                src={`/assets/teeth/${tooth}.svg`}
                                width={tooth >= 26 ? 35 : 20}
                                height={0}
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
                                    style={{
                                        filter: `${
                                            selected?.includes(tooth)
                                                ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                                : ""
                                        }`,
                                    }}
                                    src={`/assets/teeth/${tooth}.svg`}
                                    width={tooth >= 46 ? 35 : 20}
                                    height={0}
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
                                style={{
                                    filter: `${
                                        selected?.includes(tooth)
                                            ? "invert(52%) sepia(69%) saturate(5211%) hue-rotate(193deg) brightness(103%) contrast(88%)"
                                            : ""
                                    }`,
                                }}
                                src={`/assets/teeth/${tooth}.svg`}
                                width={tooth >= 36 ? 35 : 20}
                                height={0}
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
    );
};

export default DentalSelect;
