"use client";
import Spinner from "@/app/component/spinner/Spinner";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackCircleOutline, IoEye, IoEyeOff } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import "../../style.css";
import ProfileHook from "./hook/ProfileHook";

export default function ProfilePage() {
    const {
        changeHandler,
        isEdit,
        setIsEdit,
        data,
        phoneChangeHandler,
        phoneTwoChangeHandler,
        handleSendForm,
        idTypes,
        colombianStates,
        countries,
        getCities,
        selectChangeHandlerIdType,
        selectChangeHandlerState,
        selectChangeHandlerCountry,
        selectChangeHandlerCity,
        selectChangeHandlerSpecialty,
        selectChangeHandlerContract,
        nextStep,
        specialties,
        contracts,
        handleNextStep,
        errorImg,
        handleInputFileChange,
        fileName,
        handleClose,
        user,
        userData,
        newPassword,
        error,
        success,
        setNewPassword,
        showPassword,
        setShowPassword,
        currentPassword,
        setCurrentPassword,
        confirmPassword,
        setConfirmPassword,
        handleChangePassword,
        setError,
        setSuccess,
    } = ProfileHook();

    if (!user) {
        return <Spinner />;
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-image bg-cover">
            <div className="px-4 lg:px-16 py-8 mx-4 mb-16 mt-8 bg-company-gray rounded-2xl shadow-xl flex flex-col items-center space-y-4">
                <div className="w-full flex items-center space-x-2 text-company-blue font-bold text-xl">
                    {!isEdit && (
                        <Link
                            className="flex flex-row items-center justify-center space-x-4"
                            href={"/dashboard"}
                        >
                            <IoArrowBackCircleOutline />
                            <h2>Mi Perfil</h2>
                        </Link>
                    )}
                </div>
                {isEdit ? (
                    <div className="flex flex-col items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="relative flex flex-col items-center justify-center w-[170px] h-[170px] rounded-full border-2 border-gray-300 border-dashed  cursor-pointer bg-black/40 dark:bg-gray-700 hover:bg-black dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-5 text-center">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-xs text-company-orange dark:text-company-orange">
                                    <span
                                        className={`font-semibold ${
                                            fileName !== "Foto de Perfil" &&
                                            "text-base text-center text-green-500 pt-3"
                                        }`}
                                    >
                                        {fileName === "Foto de Perfil"
                                            ? "Click para Cargar Imagen"
                                            : fileName}
                                    </span>
                                </p>
                                <p className="text-xs text-white dark:text-gray-400">
                                    PNG, JPG (MAX. 400x400px)
                                </p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                name="urlPhoto"
                                accept=".jpg, .jpeg, .png"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleInputFileChange}
                            />
                        </label>
                        <div className="col flex flex-col md:col-span-2 lg:col-span-3 items-end">
                            {errorImg && (
                                <p style={{ color: "red" }}>{errorImg}</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="relative w-[170px] h-[170px] rounded-full border-2 border-blue-300">
                        <Image
                            src={
                                data.urlPhoto
                                    ? data.urlPhoto
                                    : "https://via.placeholder.com/512"
                            }
                            alt="avatar"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                )}

                <div className="flex flex-col space-y-5">
                    {!nextStep ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 sm:mx-16">
                            <div className="col-span-2 lg:col-span-1 relative flex flex-col w-full">
                                <select
                                    value={data.idType}
                                    id="idType"
                                    name="idType"
                                    required
                                    className="bg-transparent border-b-2 border-white text-white py-[9px] pr-10"
                                    onChange={selectChangeHandlerIdType}
                                >
                                    <option
                                        value=""
                                        hidden
                                        className=" text-company-orange"
                                    >
                                        Seleccione...
                                    </option>
                                    {idTypes.map((option, index) => (
                                        <option
                                            key={index}
                                            value={option.value}
                                            className="bg-black/50 text-white"
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {isEdit && (
                                    // <Link href={""}>
                                    <RiEditBoxFill className="absolute right-4 bottom-8 text-3xl text-company-orange" />
                                    // </Link>
                                )}
                                <span className="text-company-orange">
                                    Tipo Documento
                                </span>
                            </div>
                            <div className="col-span-2 lg:col-span-1 relative flex flex-col w-full">
                                <input
                                    value={data.id}
                                    id="dni"
                                    name="id"
                                    type="text"
                                    required
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                    onChange={changeHandler}
                                />
                                <span className="text-company-orange">
                                    Documento
                                </span>
                                {isEdit && (
                                    <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                )}
                            </div>
                            <div className="col-span-2 lg:col-span-1 flex flex-col relative w-full">
                                <input
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                    readOnly={!isEdit}
                                    onChange={changeHandler}
                                />
                                <span className="text-company-orange">
                                    Nombre
                                </span>
                                {isEdit && (
                                    // <Link href={""}>
                                    <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                    // </Link>
                                )}
                            </div>
                            <div className="col-span-2 lg:col-span-1 flex flex-col relative w-full">
                                <input
                                    name="lastName"
                                    type="text"
                                    value={data.lastName}
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                    readOnly={!isEdit}
                                    onChange={changeHandler}
                                />
                                <span className="text-company-orange">
                                    Apellido
                                </span>
                                {isEdit && (
                                    // <Link href={""}>
                                    <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                    // </Link>
                                )}
                            </div>
                            <div className="col-span-2 lg:col-span-1 flex flex-col relative w-full">
                                <input
                                    // disabled
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                    // readOnly={!isEdit}
                                    readOnly
                                    onChange={changeHandler}
                                />
                                <span className="text-company-orange">
                                    Correo
                                </span>
                                {isEdit && (
                                    // <Link href={""}>
                                    <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                    // </Link>
                                )}
                            </div>
                            <div className="col-span-2 lg:col-span-1 flex flex-col relative w-full">
                                <PhoneInput
                                    // disabled={!isEdit}
                                    autoFormat={false}
                                    inputProps={{
                                        name: "phone",
                                        required: true,
                                        pattern:
                                            "^(\\+?\\d{1,4})?\\s?\\d{11,15}$",
                                        title: "Por favor, ingrese un número de teléfono válido",
                                        readOnly: !isEdit,
                                    }}
                                    country={"co"}
                                    specialLabel=""
                                    placeholder=""
                                    prefix="+"
                                    dropdownStyle={{
                                        color: "black",
                                        borderRadius: 12,
                                        backgroundColor: "gray",
                                    }}
                                    containerStyle={{
                                        borderBottom: "2px solid white",
                                        // margin: "5px 0 0 0",
                                    }}
                                    buttonStyle={{
                                        breakBefore: "initial",
                                        background: "transparent",
                                        borderColor: "transparent",
                                        borderRadius: 12,
                                        backgroundColor: "transparent",
                                        border: "none",
                                        outline: "none",
                                    }}
                                    inputStyle={{
                                        borderColor: "transparent",
                                        background: "transparent",
                                        fontSize: 18,
                                        fontWeight: "inherit",
                                        fontFamily: "inherit",
                                        color: "white",
                                    }}
                                    value={data.phone}
                                    onChange={phoneChangeHandler}
                                />
                                <span className="text-company-orange">
                                    Celular
                                </span>
                                {isEdit && (
                                    // <Link href={""}>
                                    <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                    // </Link>
                                )}
                            </div>

                            {isEdit && (
                                <>
                                    <div className="col-span-2 flex flex-col relative w-full">
                                        <input
                                            // disabled
                                            name="currentPassword"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                            readOnly={!isEdit}
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <span className="text-company-orange">
                                            Contraseña Actual
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword ? (
                                                <IoEyeOff className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                            ) : (
                                                <IoEye className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1 flex flex-col relative w-full">
                                        <input
                                            // disabled
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                            readOnly={!isEdit}
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                        />
                                        <span className="text-company-orange">
                                            Nueva Contraseña
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword ? (
                                                <IoEyeOff className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                            ) : (
                                                <IoEye className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="col-span-2 lg:col-span-1 flex flex-col relative w-full">
                                        <input
                                            // disabled
                                            name="confirmPassword"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="bg-transparent border-b-2 border-white text-white py-2 pr-10 w-full"
                                            readOnly={!isEdit}
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <span className="text-company-orange">
                                            Confirmar Contraseña
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowPassword(!showPassword);
                                            }}
                                        >
                                            {showPassword ? (
                                                <IoEyeOff className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                            ) : (
                                                <IoEye className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                            )}
                                        </button>
                                    </div>
                                    <div className="col-span-2 flex flex-col relative w-full items-center">
                                        <button
                                            type="button"
                                            onClick={handleChangePassword}
                                            className="border-company-blue bg-slate-700 flex space-x-2 items-center border py-2 px-4 rounded-md text-white"
                                        >
                                            <span>Cambiar Contraseña</span>
                                        </button>
                                    </div>
                                </>
                            )}

                            {error && (
                                <div className="col-span-2 flex items-center justify-center">
                                    <div
                                        className="border border-red-500 text-red-100 px-4 py-3 rounded relative bg-red-800 flex flex-row justify-between items-center space-x-4"
                                        role="alert"
                                    >
                                        <span
                                            className="block sm:inline text-sm
                                         sm:text-base"
                                        >
                                            {error}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setError(null)}
                                        >
                                            <MdOutlineClose className="fill-current h-6 w-6 text-red-200" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="col-span-2 flex items-center justify-center">
                                    <div
                                        className="bg-green-700 border border-green-500 text-green-100 px-4 py-3 rounded relative flex flex-row justify-between items-center space-x-4"
                                        role="alert"
                                    >
                                        <span
                                            className="block sm:inline text-base
                                         sm:text-sm"
                                        >
                                            {success}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setSuccess(null)}
                                        >
                                            <MdOutlineClose className="fill-current h-6 w-6 text-green-200" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-4 sm:mx-16">
                            <div className="col flex flex-col lg:col-span-2 relative w-full">
                                <input
                                    value={data.address}
                                    id="address"
                                    name="address"
                                    type="text"
                                    // required
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                    onChange={changeHandler}
                                />
                                <span className="text-company-orange">
                                    Dirección
                                </span>
                                {isEdit && (
                                    <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                )}
                            </div>
                            <div className="col flex flex-col relative w-full">
                                <PhoneInput
                                    // disabled={!isEdit}
                                    autoFormat={false}
                                    inputProps={{
                                        name: "phone2",
                                        required: true,
                                        pattern:
                                            "^(\\+?\\d{1,4})?\\s?\\d{11,15}$",
                                        title: "Por favor, ingrese un número de teléfono válido",
                                        readOnly: !isEdit,
                                    }}
                                    country={"co"}
                                    specialLabel=""
                                    placeholder=""
                                    prefix="+"
                                    dropdownStyle={{
                                        color: "black",
                                        borderRadius: 12,
                                    }}
                                    containerStyle={{
                                        borderBottom: "2px solid white",
                                        margin: "5px 0 0 0",
                                    }}
                                    buttonStyle={{
                                        breakBefore: "initial",
                                        background: "transparent",
                                        borderColor: "transparent",
                                        borderRadius: 12,
                                        backgroundColor: "transparent",
                                        border: "none",
                                        outline: "none",
                                    }}
                                    inputStyle={{
                                        borderColor: "transparent",
                                        background: "transparent",
                                        fontSize: 18,
                                        fontWeight: "inherit",
                                        fontFamily: "inherit",
                                        color: "white",
                                    }}
                                    value={data.phone2}
                                    onChange={phoneTwoChangeHandler}
                                />
                                <span className="text-company-orange">
                                    Teléfono Fijo
                                </span>
                                {isEdit && (
                                    <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                                )}
                            </div>
                            <div className="col relative flex flex-col w-full">
                                <select
                                    value={data.country}
                                    id="country"
                                    name="country"
                                    // required
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10 h-full"
                                    onChange={selectChangeHandlerCountry}
                                >
                                    <option
                                        value=""
                                        hidden
                                        className="bg-black/50"
                                    >
                                        Seleccione...
                                    </option>
                                    {countries.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            className="bg-black/50"
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-company-orange">
                                    País
                                </span>
                                {isEdit && (
                                    <RiEditBoxFill className="absolute right-4 bottom-8 text-3xl text-company-orange" />
                                )}
                            </div>
                            <div className="col relative flex flex-col w-full">
                                <select
                                    value={data.state}
                                    disabled={!data.country}
                                    id="state"
                                    name="state"
                                    // required
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                    onChange={selectChangeHandlerState}
                                >
                                    <option
                                        value=""
                                        hidden
                                        className="bg-black/50"
                                    >
                                        Seleccione...
                                    </option>
                                    {colombianStates.map((option) => (
                                        <option
                                            key={option.value}
                                            value={option.value}
                                            className="bg-black/50"
                                        >
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <span className="text-company-orange">
                                    Departamento
                                </span>
                                {isEdit && (
                                    <RiEditBoxFill className="absolute right-4 bottom-8 text-3xl text-company-orange" />
                                )}
                            </div>
                            <div className="col relative flex flex-col w-full">
                                <select
                                    value={data.city}
                                    disabled={!data.state}
                                    id="city"
                                    name="city"
                                    // required
                                    className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                    onChange={selectChangeHandlerCity}
                                >
                                    <option
                                        value=""
                                        hidden
                                        className="bg-black/50"
                                    >
                                        Seleccione...
                                    </option>
                                    {data.state &&
                                        getCities(data.state).map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                                className="bg-black/50"
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                </select>
                                <span className="text-company-orange">
                                    Ciudad
                                </span>
                                {isEdit && (
                                    <RiEditBoxFill className="absolute right-4 bottom-8 text-3xl text-company-orange" />
                                )}
                            </div>
                            {userData?.rol !== "ShHQKRuKJfxHcV70XSvC" && (
                                <>
                                    <div className="col-span-2 flex flex-col relative w-full">
                                        <select
                                            value={data.specialty}
                                            id="specialty"
                                            name="specialty"
                                            // required
                                            className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                            onChange={
                                                selectChangeHandlerSpecialty
                                            }
                                        >
                                            <option
                                                value=""
                                                hidden
                                                className="bg-black"
                                            >
                                                Seleccione...
                                            </option>
                                            {specialties?.map(
                                                (
                                                    option: any,
                                                    index: number,
                                                ) => (
                                                    <option
                                                        key={index}
                                                        value={option.name}
                                                        className="bg-black text-white"
                                                    >
                                                        {option.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        <span className="text-company-orange">
                                            Especialidad
                                        </span>
                                        {isEdit && (
                                            <RiEditBoxFill className="absolute right-4 bottom-8 text-3xl text-company-orange" />
                                        )}
                                    </div>
                                    {/* <div className="col relative flex flex-col w-full">
                                        <select
                                            value={data.contract}
                                            id="contract"
                                            name="contract"
                                            // required
                                            className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                                            onChange={
                                                selectChangeHandlerContract
                                            }
                                        >
                                            <option
                                                value=""
                                                hidden
                                                className="bg-black"
                                            >
                                                Seleccione...
                                            </option>
                                            {contracts?.map(
                                                (
                                                    option: any,
                                                    index: number,
                                                ) => (
                                                    <option
                                                        key={index}
                                                        value={option.name}
                                                        className="bg-black text-white"
                                                    >
                                                        {option.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                        <span className="text-company-orange">
                                            Convenio
                                        </span>
                                        {isEdit && (
                                            <RiEditBoxFill className="absolute right-4 bottom-8 text-3xl text-company-orange" />
                                        )}
                                    </div> */}
                                </>
                            )}
                        </div>
                    )}
                    {/* <div className="col flex flex-col relative w-full">
                        <input
                            type="password"
                            value="Fabian123Demo"
                            className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
                            readOnly={!isEdit}
                        />
                        <span className="text-company-orange">Contraseña</span>
                        {isEdit && (
                            <Link href={""}>
                                <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
                            </Link>
                        )}
                    </div> */}
                    <div className="col-span-2 flex justify-around space-x-2">
                        {isEdit ? (
                            <>
                                <button
                                    onClick={() => {
                                        handleNextStep();
                                        // nextStep && handleSendForm();
                                    }}
                                    className="border-company-blue bg-slate-700 flex space-x-2 items-center border py-2 px-4 rounded-md text-white"
                                >
                                    <span>
                                        {nextStep ? "Regresar" : "Siguiente"}
                                    </span>
                                </button>

                                <button
                                    onClick={() => {
                                        handleNextStep(false);
                                        setIsEdit(!isEdit);
                                        handleClose();
                                    }}
                                    className="border-company-blue bg-slate-600 flex space-x-2 items-center border py-2 px-4 rounded-md text-slate-300"
                                >
                                    <span>Cancelar</span>
                                </button>
                                {nextStep && (
                                    <button
                                        onClick={() => {
                                            handleNextStep(false);
                                            setIsEdit(!isEdit);
                                            handleSendForm();
                                            handleClose();
                                        }}
                                        className="border-company-blue bg-slate-700 flex space-x-2 items-center border py-2 px-4 rounded-md text-slate-300"
                                    >
                                        <span>Guardar</span>
                                    </button>
                                )}
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setIsEdit(!isEdit);
                                    }}
                                    className="border-company-blue bg-slate-700 flex space-x-2 items-center border py-2 px-4 rounded-md text-white"
                                >
                                    <RiEditBoxFill />
                                    <span>Editar Datos</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
