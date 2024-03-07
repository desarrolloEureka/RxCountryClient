"use client";

import Link from "next/link";
import DashboardHeader from "../component/DashboardHeader";
import Image from "next/image";
import OrderIcon from "../component/icons/OrderIcon";
import { IoArrowForward } from "react-icons/io5";

export default function Dashboard() {
  return (
    <main className="min-h-screen w-full bg-home-image">
      <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full p-16 space-y-16">
        <DashboardHeader />
        <div className="mx-32 flex flex-col space-y-8">
          <h2 className="text-white font-bold text-5xl">Bienvenido Doc</h2>
          <p className="text-white w-[30%]">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
            ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat.
          </p>
          <button className="w-48 flex justify-center items-center space-x-2 text-white hover:text-gray-300 text-center border-white hover:border-gray-300 border-2 rounded-md p-2">
            <span>Empezar</span>
            <IoArrowForward />
          </button>
        </div>
      </div>
    </main>
  );
}
