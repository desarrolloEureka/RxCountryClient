"use client";
import Link from "next/link";
import { BsFillGeoAltFill, BsFillPersonVcardFill } from "react-icons/bs";
import { FaFileContract } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { ImKey } from "react-icons/im";
import {
    IoArrowBackCircleOutline,
    IoEye,
    IoEyeOff,
    IoMail,
    IoPerson,
} from "react-icons/io5";
import { RiRoadMapLine } from "react-icons/ri";
import PhoneInput from "react-phone-input-2";
import Spinner from "../component/spinner/Spinner";
import "../style.css";
import SignUpHook from "./hook/SignUpHook";

export default function SignUp() {
    const {
        data,
        user,
        errorPass,
        showPassword,
        idTypes,
        countries,
        isActiveUser,
        colombianStates,
        specialties,
        contracts,
        isSendData,
        nextStep,
        professionalsVal,
        errorImg,
        fileName,
        setNextStep,
        setErrorPass,
        handleClose,
        getCities,
        setShowPassword,
        changeHandler,
        handleSendForm,
        selectChangeHandlerIdType,
        selectChangeHandlerStatus,
        selectChangeHandlerCountry,
        selectChangeHandlerState,
        selectChangeHandlerCity,
        selectChangeHandlerSpecialty,
        selectChangeHandlerContract,
        handleInputFileChange,
        phoneChangeHandler,
        phoneTwoChangeHandler,
    } = SignUpHook();

    if (user || user === undefined || isSendData) {
        return <Spinner />;
    }

    return (
        <main className="relative flex flex-col justify-center items-center bg-login-image bg-cover bg-bottom min-h-screen w-full pb-10">
            <form
                onSubmit={handleSendForm}
                method="POST"
                className="flex flex-col items-center space-y-8 px-4 py-8 lg:p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80 w-[90%] lg:w-[60%] xl:w-[50%] sm:h-auto"
            >
                <div className="w-full">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-company-blue"
                        onClick={() => handleClose()}
                    >
                        <IoArrowBackCircleOutline className="text-2xl" />
                        <span>Atrás</span>
                    </Link>
                </div>
                <h2 className="w-full text-center text-company-orange text-xl lg:text-2xl">
                    Registro de Profesionales
                </h2>

                <div className="flex flex-col space-y-8 items-center w-full lg:w-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 w-full lg:w-auto justify-center gap-5">
                        {nextStep ? (
                            <>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="idType"
                                        className="text-white"
                                    >
                                        Tipo de Documento&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>
                                    <select
                                        value={data.idType}
                                        id="idType"
                                        name="idType"
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
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
                                                className="bg-black text-white"
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <BsFillPersonVcardFill />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label htmlFor="dni" className="text-white">
                                        Documento&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>
                                    <input
                                        value={data.id}
                                        id="dni"
                                        name="id"
                                        type="text"
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10 pr-3"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <BsFillPersonVcardFill />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-white"
                                    >
                                        Nombres&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>
                                    <input
                                        value={data.name}
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10 pr-3"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <IoPerson />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="lastName"
                                        className="text-white"
                                    >
                                        Apellidos&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>
                                    <input
                                        value={data.lastName}
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10 pr-3"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <IoPerson />
                                    </span>
                                </div>
                                <div className="col relative flex md:col-span-2 flex-col w-full space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-white"
                                    >
                                        Correo&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>

                                    <input
                                        value={data.email}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <IoMail />
                                    </span>
                                </div>
                                <div className="col relative flex md:col-span-2 flex-col w-full space-y-2">
                                    <label
                                        htmlFor="confirmEmail"
                                        className="text-white"
                                    >
                                        Confirmar Correo&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>

                                    <input
                                        onPaste={(e) => {
                                            alert("No puedes pegar");
                                            e.preventDefault();
                                        }}
                                        value={data.confirmEmail}
                                        id="confirmEmail"
                                        name="confirmEmail"
                                        type="email"
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <IoMail />
                                    </span>
                                </div>
                                {/* <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="text-white"
                                    >
                                        Contraseña&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>
                                    <input
                                        value={data.password}
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        title="Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-4 text-company-blue text-[1.5rem]">
                                        <ImKey />
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <span className="absolute right-2 bottom-4 text-company-blue text-[1.5rem]">
                                            {showPassword ? (
                                                <IoEyeOff />
                                            ) : (
                                                <IoEye />
                                            )}
                                        </span>
                                    </button>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="confirmPassword"
                                        className="text-white"
                                    >
                                        Repite tu Contraseña&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>
                                    <input
                                        value={data.confirmPassword}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        title="Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-4 text-company-blue text-[1.5rem]">
                                        <ImKey />
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <span className="absolute right-2 bottom-4 text-company-blue text-[1.5rem]">
                                            {showPassword ? (
                                                <IoEyeOff />
                                            ) : (
                                                <IoEye />
                                            )}
                                        </span>
                                    </button>
                                </div> */}
                                <div className="col relative flex flex-col md:col-span-2 lg:col-span-1 w-full space-y-2">
                                    <label
                                        htmlFor="phone"
                                        className="text-white"
                                    >
                                        Celular&nbsp;
                                        <span className="text-blue-500">*</span>
                                    </label>
                                    <PhoneInput
                                        autoFormat={false}
                                        inputProps={{
                                            name: "phone",
                                            required: true,
                                            pattern:
                                                "^(\\+?\\d{1,4})?\\s?\\d{11,15}$",
                                            title: "Por favor, ingrese un número de teléfono válido",
                                        }}
                                        country={"co"}
                                        specialLabel=""
                                        placeholder=""
                                        prefix="+"
                                        dropdownStyle={{
                                            color: "black",
                                            borderRadius: 12,
                                        }}
                                        value={data.phone}
                                        onChange={phoneChangeHandler}
                                    />

                                    {/* <span className="absolute left-2 bottom-4 text-company-blue text-[1.5rem]">
                                        <IoCall />
                                    </span> */}
                                </div>
                                <div className="col flex flex-col md:col-span-2 lg:col-span-3 items-center">
                                    <p
                                        className="mt-1 text-sm text-center text-white"
                                        id="file_input_help"
                                    >
                                        Los campos con&nbsp;(&nbsp;
                                        <span className="text-blue-500">*</span>
                                        &nbsp;) son obligatorios.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col relative flex flex-col md:col-span-2 lg:col-span-1 w-full space-y-2">
                                    <label
                                        htmlFor="phone2"
                                        className="text-white"
                                    >
                                        Teléfono Fijo (Opcional)
                                    </label>
                                    <PhoneInput
                                        specialLabel=""
                                        placeholder=""
                                        country={"co"}
                                        dropdownStyle={{
                                            color: "black",
                                            borderRadius: 12,
                                        }}
                                        value={data.phone2}
                                        onChange={phoneTwoChangeHandler}
                                    />
                                    {/* <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <IoCall />
                                    </span> */}
                                </div>
                                <div className="flex flex-col relative md:col-span-2 w-full space-y-2">
                                    <label
                                        htmlFor="address"
                                        className="text-white"
                                    >
                                        Dirección&nbsp;
                                        {/* <span className="text-blue-500">*</span> */}
                                    </label>
                                    <input
                                        value={data.address}
                                        id="address"
                                        name="address"
                                        type="text"
                                        // required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={changeHandler}
                                    />
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <BsFillGeoAltFill />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="country"
                                        className="text-white"
                                    >
                                        País&nbsp;
                                        {/* <span className="text-blue-500">*</span> */}
                                    </label>
                                    <select
                                        value={data.country}
                                        id="country"
                                        name="country"
                                        // required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={selectChangeHandlerCountry}
                                    >
                                        <option
                                            value=""
                                            hidden
                                            className="bg-black"
                                        >
                                            Seleccione...
                                        </option>
                                        {countries.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                                className="bg-black"
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <RiRoadMapLine />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="state"
                                        className="text-white"
                                    >
                                        Departamento&nbsp;
                                        {/* <span className="text-blue-500">*</span> */}
                                    </label>
                                    <select
                                        value={data.state}
                                        id="state"
                                        name="state"
                                        // required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={selectChangeHandlerState}
                                    >
                                        <option
                                            value=""
                                            hidden
                                            className="bg-black"
                                        >
                                            Seleccione...
                                        </option>
                                        {colombianStates.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                                className="bg-black"
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <RiRoadMapLine />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="city"
                                        className="text-white"
                                    >
                                        Ciudad&nbsp;
                                        {/* <span className="text-blue-500">*</span> */}
                                    </label>
                                    <select
                                        value={data.city}
                                        disabled={!data.state}
                                        id="city"
                                        name="city"
                                        // required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={selectChangeHandlerCity}
                                    >
                                        <option
                                            value=""
                                            hidden
                                            className="bg-black"
                                        >
                                            Seleccione...
                                        </option>
                                        {data.state &&
                                            getCities(data.state).map(
                                                (option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                        className="bg-black"
                                                    >
                                                        {option.label}
                                                    </option>
                                                ),
                                            )}
                                    </select>
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <RiRoadMapLine />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="specialty"
                                        className="text-white"
                                    >
                                        Especialidad&nbsp;
                                        {/* <span className="text-blue-500">*</span> */}
                                    </label>
                                    <select
                                        value={data.specialty}
                                        id="specialty"
                                        name="specialty"
                                        // required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={selectChangeHandlerSpecialty}
                                    >
                                        <option
                                            value=""
                                            hidden
                                            className="bg-black"
                                        >
                                            Seleccione...
                                        </option>
                                        {specialties?.map(
                                            (option: any, index: number) => (
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
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <FaUserDoctor />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="contract"
                                        className="text-white"
                                    >
                                        Convenio&nbsp;
                                        {/* <span className="text-blue-500">*</span> */}
                                    </label>
                                    <select
                                        value={data.contract}
                                        id="contract"
                                        name="contract"
                                        // required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                        onChange={selectChangeHandlerContract}
                                    >
                                        <option
                                            value=""
                                            hidden
                                            className="bg-black"
                                        >
                                            Seleccione...
                                        </option>
                                        {contracts?.map(
                                            (option: any, index: number) => (
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
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <FaFileContract />
                                    </span>
                                </div>
                                {/* <div className="col flex flex-col w-full space-y-2">
                            <label htmlFor="isActive" className="text-white">
                                Estado&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <select
                                id="isActive"
                                name="isActive"
                                required
                                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-4"
                                onChange={selectChangeHandlerStatus}
                            >
                                <option value="" hidden className="bg-black">
                                    Seleccione...
                                </option>
                                {isActiveData.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                        className="bg-black"
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                                <div className="col flex flex-col w-full space-y-2">
                                    <label
                                        htmlFor="urlPhoto"
                                        className="text-white"
                                    >
                                        Foto de Perfil
                                        {/* &nbsp;
                                <span className="text-blue-500">*</span> */}
                                    </label>
                                    <input
                                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-xl border-company-blue border bg-transparent bg-clip-padding px-3 pt-[0.45rem] text-base text-white font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:text-white file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3 file:py-[0.32rem] file:text-surface focus:border-primary focus:text-white focus:shadow-inset focus:outline-none dark:border-company-blue dark:text-white file:dark:text-white hover:border-white"
                                        id="urlPhoto"
                                        name="urlPhoto"
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleInputFileChange}
                                        // required
                                    />
                                </div>
                                <div className="col flex flex-col md:col-span-2 lg:col-span-3 items-end">
                                    {errorImg ? (
                                        <p style={{ color: "red" }}>
                                            {errorImg}
                                        </p>
                                    ) : (
                                        <p
                                            className={`mt-1 text-sm text-center ${
                                                fileName
                                                    ? "text-green-500"
                                                    : "text-company-orange"
                                            } `}
                                        >
                                            PNG, JPG (MAX. 400x400px).
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {errorPass && (
                        <div
                            id="alert-additional-content-1"
                            className="p-2 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                            role="alert"
                        >
                            <div className="flex items-center space-x-2">
                                <svg
                                    className="flex-shrink-0 w-4 h-4 me-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span>
                                    <strong>
                                        Ingrese el correo correctamente!.
                                    </strong>
                                    &nbsp;Vuelva a intentar!
                                </span>
                                <button
                                    type="button"
                                    className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                                    data-dismiss-target="#alert-border-1"
                                    aria-label="Close"
                                    onClick={() => setErrorPass(false)}
                                >
                                    <span className="sr-only">Dismiss</span>
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {nextStep ? (
                        <button
                            type={professionalsVal ? "button" : "submit"}
                            onClick={() =>
                                professionalsVal && setNextStep(false)
                            }
                            className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                        >
                            Siguiente
                        </button>
                    ) : (
                        <div className="flex flex-row justify-around w-full mx-16">
                            <button
                                onClick={() => setNextStep(true)}
                                className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                            >
                                Regresar
                            </button>
                            <button
                                type="submit"
                                className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                            >
                                Regístrate
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </main>
    );
}
