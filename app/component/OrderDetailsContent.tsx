"use client";
import Link from "next/link";
import { useState } from "react";
import { IoArrowBackCircleOutline, IoEye } from "react-icons/io5";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const OrderDetailsContent = () => {
  const [expandReceptionData, setExpandReceptionData] = useState(false);
  const [expandSpecialist, setExpandSpecialist] = useState(false);
  const [expandRx1, setExpandRx1] = useState(false);
  const [expandRx2, setExpandRx2] = useState(false);

  return (
    <div className="mx-auto flex flex-col space-y-8 rounded-[2.5rem] bg-company-gray p-12 w-full max-w-[1440px]">
      <div className="flex items-center space-x-8">
        <Link href={"/dashboard/orders-historial"}>
          <IoArrowBackCircleOutline className="text-company-blue" size={32} />
        </Link>
        <h2 className="text text-company-orange text-xl">
          Orden #123456 - Jhon Doe
        </h2>
      </div>
      <div className="mx-16">
        <button className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white">
          <IoEye className="text-company-blue" size={24} />
          <span>Previsualizar PDF</span>
        </button>
      </div>
      {/* Reception data */}
      <div
        className={`flex flex-col mx-16 transition-transform rounded-xl ${
          expandReceptionData
            ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
            : "bg-company-blue text-white"
        }`}
      >
        <button
          onClick={() => setExpandReceptionData(!expandReceptionData)}
          className="flex justify-between items-center py-2 px-4"
        >
          Datos recepción
          {expandReceptionData ? (
            <RiArrowUpSLine size={32} />
          ) : (
            <RiArrowDownSLine size={32} />
          )}
        </button>
        {expandReceptionData && (
          <div className="flex flex-col p-4 space-y-2 text-white">
            <h2 className="font-bold text-xl">Observaciones</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pretium velit ut efficitur elementum. Cras ac sapien hendrerit,
              consequat enim ac, faucibus tellus. Sed a sagittis lorem. Donec
              eget elit a leo ullamcorper accumsan ac sit amet metus.
              Suspendisse at ligula malesuada, euismod elit sed, ultricies leo.
              Aliquam tempus dictum ante, eu tincidunt urna aliquam id. Mauris
              vulputate ex id felis euismod, non pretium lorem faucibus. Morbi
              sed iaculis lectus. Duis vulputate, mi quis laoreet suscipit, nisi
              enim maximus ante, nec dignissim diam ex id nunc. Maecenas
              sagittis metus libero, ut vehicula velit rutrum nec. Vivamus at
              rutrum lacus, in sagittis augue. Phasellus a sem convallis,
              fringilla metus viverra, commodo est. Pellentesque elementum
              posuere quam sit amet sodales. Ut ac scelerisque ex. Donec et
              massa nunc. Pellentesque ligula lorem, sodales in bibendum eget,
              pellentesque nec metus.
            </p>
          </div>
        )}
      </div>
      {/* Especialist */}
      <div
        className={`flex flex-col mx-16 transition-transform rounded-xl ${
          expandSpecialist
            ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
            : "bg-company-blue text-white"
        }`}
      >
        <button
          onClick={() => setExpandSpecialist(!expandSpecialist)}
          className="flex justify-between items-center py-2 px-4 "
        >
          Especialista
          {expandSpecialist ? (
            <RiArrowUpSLine size={32} />
          ) : (
            <RiArrowDownSLine size={32} />
          )}
        </button>
        {expandSpecialist && (
          <div className="flex flex-col p-4 space-y-2 text-white">
            <h2 className="font-bold text-xl">Observaciones</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pretium velit ut efficitur elementum. Cras ac sapien hendrerit,
              consequat enim ac, faucibus tellus. Sed a sagittis lorem. Donec
              eget elit a leo ullamcorper accumsan ac sit amet metus.
              Suspendisse at ligula malesuada, euismod elit sed, ultricies leo.
              Aliquam tempus dictum ante, eu tincidunt urna aliquam id. Mauris
              vulputate ex id felis euismod, non pretium lorem faucibus. Morbi
              sed iaculis lectus. Duis vulputate, mi quis laoreet suscipit, nisi
              enim maximus ante, nec dignissim diam ex id nunc. Maecenas
              sagittis metus libero, ut vehicula velit rutrum nec. Vivamus at
              rutrum lacus, in sagittis augue. Phasellus a sem convallis,
              fringilla metus viverra, commodo est. Pellentesque elementum
              posuere quam sit amet sodales. Ut ac scelerisque ex. Donec et
              massa nunc. Pellentesque ligula lorem, sodales in bibendum eget,
              pellentesque nec metus.
            </p>
          </div>
        )}
      </div>
      {/* Rx1 */}
      <div
        className={`flex flex-col mx-16 transition-transform rounded-xl ${
          expandRx1
            ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
            : "bg-company-blue text-white"
        }`}
      >
        <button
          onClick={() => setExpandRx1(!expandRx1)}
          className="flex justify-between items-center py-2 px-4"
        >
          Rx 1
          {expandRx1 ? (
            <RiArrowUpSLine size={32} />
          ) : (
            <RiArrowDownSLine size={32} />
          )}
        </button>
        {expandRx1 && (
          <div className="flex flex-col p-4 space-y-2 text-white">
            <h2 className="font-bold text-xl">Observaciones</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pretium velit ut efficitur elementum. Cras ac sapien hendrerit,
              consequat enim ac, faucibus tellus. Sed a sagittis lorem. Donec
              eget elit a leo ullamcorper accumsan ac sit amet metus.
              Suspendisse at ligula malesuada, euismod elit sed, ultricies leo.
              Aliquam tempus dictum ante, eu tincidunt urna aliquam id. Mauris
              vulputate ex id felis euismod, non pretium lorem faucibus. Morbi
              sed iaculis lectus. Duis vulputate, mi quis laoreet suscipit, nisi
              enim maximus ante, nec dignissim diam ex id nunc. Maecenas
              sagittis metus libero, ut vehicula velit rutrum nec. Vivamus at
              rutrum lacus, in sagittis augue. Phasellus a sem convallis,
              fringilla metus viverra, commodo est. Pellentesque elementum
              posuere quam sit amet sodales. Ut ac scelerisque ex. Donec et
              massa nunc. Pellentesque ligula lorem, sodales in bibendum eget,
              pellentesque nec metus.
            </p>
          </div>
        )}
      </div>
      {/* Rx2 */}
      <div
        className={`flex flex-col mx-16 transition-transform rounded-xl ${
          expandRx2
            ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
            : "bg-company-blue text-white"
        }`}
      >
        <button
          onClick={() => setExpandRx2(!expandRx2)}
          className="flex justify-between items-center py-2 px-4"
        >
          Rx 2
          {expandRx2 ? (
            <RiArrowUpSLine size={32} />
          ) : (
            <RiArrowDownSLine size={32} />
          )}
        </button>
        {expandRx2 && (
          <div className="flex flex-col p-4 space-y-2 text-white">
            <h2 className="font-bold text-xl">Observaciones</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pretium velit ut efficitur elementum. Cras ac sapien hendrerit,
              consequat enim ac, faucibus tellus. Sed a sagittis lorem. Donec
              eget elit a leo ullamcorper accumsan ac sit amet metus.
              Suspendisse at ligula malesuada, euismod elit sed, ultricies leo.
              Aliquam tempus dictum ante, eu tincidunt urna aliquam id. Mauris
              vulputate ex id felis euismod, non pretium lorem faucibus. Morbi
              sed iaculis lectus. Duis vulputate, mi quis laoreet suscipit, nisi
              enim maximus ante, nec dignissim diam ex id nunc. Maecenas
              sagittis metus libero, ut vehicula velit rutrum nec. Vivamus at
              rutrum lacus, in sagittis augue. Phasellus a sem convallis,
              fringilla metus viverra, commodo est. Pellentesque elementum
              posuere quam sit amet sodales. Ut ac scelerisque ex. Donec et
              massa nunc. Pellentesque ligula lorem, sodales in bibendum eget,
              pellentesque nec metus.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsContent;
