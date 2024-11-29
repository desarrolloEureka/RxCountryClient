'use client';
import DashboardHeader from '@/app/component/DashboardHeader';
import LightIcon from '@/app/component/icons/LightIcon';
import Spinner from '@/app/component/spinner/Spinner';
import StepByStep from '@/app/component/StepByStep';
import DoctorVector from '@/app/component/vectors/DoctorVector';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import { IoAlertCircleSharp, IoArrowBackCircleOutline } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import NewOrderHook from './hook/NewOrderHook';

const NewOrderPage = () => {

    const helpMessages: { [key: number]: string } = {
        0: "Agrega en cada campo los datos correspondientes de tu paciente para poder consultarlo de manera sencilla más adelante.",
        1: "Selecciona una o más opciones según asi se requiera, ademas selecciona cada diente a trabajar este cambiara de color una vez des click en el y quedara seleccionado automaticamente.",
        2: "Agrega en cada campo los datos correspondientes de tu paciente para poder consultarlo de manera sencilla más adelante.",
        3: "Selecciona una o varias opciones según corresponda ",
        4: "Selecciona una o varias opciones según corresponda ",
        5: "Selecciona una o varias opciones según corresponda, adicional a esto indica las observaciones para otros especialistas y la impresión diagnostica de tu paciente"
    };
    

    const {
        emailFound,
        userData,
        value,
        showHelp,
        uidUser,
        allAreas,
        setShowHelp,
        formStep,
        setFormStep,
        isDataSelected,
        setIsDataSelected,
        widthSlider,
        isEdit,
        userRol,
        optionsData,
        patientData,
        titles,
        patientVal,
        currentOrderId,
        suggestions,
        wrapperRef,
        emailFoundAlert,
        handleClose,
        changeHandler,
        idChangeHandler,
        handleInputChange,
        selectChangeHandlerIdType,
        dateChangeHandler,
        phoneChangeHandler,
        setSelectedOptions,
        handleSendForm,
        selectChangeHandlerSentTo,
        handleAreaList,
        areaList,
        user,
    } = NewOrderHook();

  if (!user) {
    return <Spinner />;
  }

  if (
    userData?.rol !== 'ZWb0Zs42lnKOjetXH5lq' &&
    userData?.rol !== 'Ll6KGdzqdtmLLk0D5jhk'
  ) {
    return (
      <main className='relative min-h-screen w-full bg-gray-image bg-fixed bg-cover'>
        <div className='bg-black bg-opacity-60 flex flex-col min-h-screen w-full py-16 px-5 sm:p-16 space-y-16'>
          <DashboardHeader selectedMenuItem='create-order' />
          <div className='rounded-xl lg:rounded-3xl shadow-lg bg-company-gray w-full max-w-screen mx-auto min-h-96'>
            <Spinner background='bg-transparent' screenH='min-h-96' />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='relative min-h-screen w-full bg-gray-image bg-fixed bg-cover'>
      <div className='bg-black bg-opacity-60 flex flex-col w-full min-h-screen py-16 px-5 lg:p-16 space-y-16'>
        <DashboardHeader selectedMenuItem='create-order' />
        <form
          onSubmit={handleSendForm}
          className='flex flex-col rounded-[1.5rem]  sm:rounded-[2.5rem] shadow-lg bg-company-gray w-full max-w-[1440px] mx-auto'
        >
          <div className='flex justify-center items-center'>
            {formStep < 6 && (
              <div
                className={`flex ${
                  formStep === 0 ? 'flex-row' : 'flex-col'
                } sm:flex-row justify-around items-center w-full p-4 sm:p-8`}
              >
                <div className='flex items-start sm:items-center w-full sm:w-auto'>
                  <Link
                    href={formStep === 0 ? '/dashboard' : ''}
                    onClick={() => {
                      formStep !== 0 &&
                        setFormStep((prevStep: number) => prevStep - 1);
                    }}
                    className='hidden sm:flex items-center'
                  >
                    <IoArrowBackCircleOutline
                      className='text-company-blue '
                      size={32}
                    />
                  </Link>
                  <Link
                    href={formStep === 0 ? '/dashboard' : ''}
                    onClick={() => {
                      formStep !== 0 && setFormStep(0);
                    }}
                    className='flex sm:hidden items-center cursor-pointer'
                  >
                    <IoArrowBackCircleOutline
                      className='text-company-blue'
                      size={25}
                    />
                  </Link>
                </div>

                <div
                  className={`${
                    formStep !== 0 ? 'hidden' : 'flex'
                  } sm:flex sm:flex-col w-full pl-2 sm:pl-0 mx-0 sm:mx-20`}
                >
                  <h3 className='text-company-blue text-lg sm:text-3xl font-bold'>
                    {titles[formStep]}
                  </h3>
                </div>

                <div className='flex flex-col w-[90%] sm:hidden'>
                  {titles.map((title, index) => (
                    <div
                      key={index}
                      onClick={() => setFormStep(index)}
                      className={`${
                        formStep === 0 ? 'hidden' : 'flex'
                      } w-full px-2 sm:pl-0 mx-0 sm:mx-20 cursor-pointer`}
                    >
                      {index !== 0 && (
                        <div
                          className={`flex flex-row justify-between items-center w-full ${
                            formStep === index
                              ? 'text-company-orange'
                              : 'text-company-blue'
                          }`}
                        >
                          <h3 className='text-lg sm:text-3xl font-bold w-[90%] text-ellipsis overflow-hidden text-nowrap'>
                            {title}
                          </h3>
                          <RiArrowDropDownLine
                            className={`w-[15%] ease-in-out duration-700 ${
                              formStep === index ? 'rotate-180' : ''
                            }`}
                            size={36}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className='hidden sm:flex sm:flex-col items-center space-y-2 text-white text-xs sm:text-base'>
                  <button
                    type='button'
                    onClick={() => setShowHelp(true)}
                    className='rounded-full w-8 h-8 flex justify-center items-center shadow-lg bg-white'
                  >
                    <LightIcon className='h-8 sm:h-auto' color='#5696D3' />
                  </button>
                  <span>Ayuda</span>
                </div>
              </div>
            )}
          </div>

          <StepByStep
            userData={userData}
            value={value}
            uidUser={uidUser}
            formStep={formStep}
            allAreas={allAreas}
            wrapperRef={wrapperRef}
            setFormStep={setFormStep}
            userRol={userRol}
            isEdit={isEdit}
            setIsDataSelected={setIsDataSelected}
            optionsData={optionsData}
            data={patientData}
            changeHandler={changeHandler}
            selectChangeHandlerIdType={selectChangeHandlerIdType}
            dateChangeHandler={dateChangeHandler}
            phoneChangeHandler={phoneChangeHandler}
            setSelectedOptions={setSelectedOptions}
            handleSendForm={handleSendForm}
            handleInputChange={handleInputChange}
            currentOrderId={currentOrderId}
            suggestions={suggestions}
            idChangeHandler={idChangeHandler}
            handleClose={handleClose}
            selectChangeHandlerSentTo={selectChangeHandlerSentTo}
            handleAreaList={handleAreaList}
            areaList={areaList}
            handleChecks={() => {}}
            handleCheckOrderIncomplete={() => {}}
            selectChangeHandlerDiagnoses={() => {}}
            selectChangeHandlerDiagnostician={() => {}}
          />

          {formStep < 6 && (
            <div className='flex flex-row items-center mt-8 overflow-visible bg-company-blue bg-opacity-25 w-full h-[0.1rem]'>
              <div
                className={`h-[0.3rem] ${
                  widthSlider[formStep]
                } bg-company-blue ${
                  formStep < 5 ? 'rounded-r-full' : 'rounded-none'
                }`}
              />
            </div>
          )}

          {formStep < 6 && (
            <div
              className={`flex ${
                formStep < 6 ? 'justify-between' : 'justify-end'
              } items-center p-4 sm:p-8`}
            >
              <div className='text-white invisible'>Paso {formStep}/5</div>
              <div className='flex items-center'>
                {/* {formStep > 0 && (
                                    <>
                                        <div
                                            onClick={() => {
                                                setFormStep(
                                                    (prevStep: number) =>
                                                        prevStep - 1,
                                                );
                                            }}
                                            className="hidden sm:flex items-center cursor-pointer text-company-blue"
                                        >
                                            <BiChevronLeft size={32} />
                                            <span>Atrás</span>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setFormStep(0);
                                            }}
                                            className="flex sm:hidden items-center cursor-pointer text-company-blue"
                                        >
                                            <BiChevronLeft size={32} />
                                            <span>Atrás</span>
                                        </div>
                                    </>
                                )} */}
                <button
                  type={patientVal ? 'button' : 'submit'}
                  onClick={() => {
                    if (patientVal) {
                      if (emailFound) {
                        emailFoundAlert();
                        return;
                      }
                      setFormStep((prevStep: number) => prevStep + 1);
                      return;
                      // setIsDataSelected(false);
                    }
                  }}
                  className='hidden sm:flex items-center cursor-pointer text-company-blue'
                >
                  {isDataSelected || formStep === 0 ? (
                    (areaList.length > 0 ||
                      formStep < 5 ||
                      userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq') && (
                      <>
                        <span>Siguiente</span>
                        <BiChevronRight size={32} />
                      </>
                    )
                  ) : (
                    <>
                      <span>Cerrar</span>
                      <BiChevronRight size={32} />
                    </>
                  )}
                </button>
                <div className='flex sm:hidden flex-row justify-between space-x-4'>
                  <button
                    type='button'
                    onClick={() => {
                      setFormStep(6);
                      // setIsDataSelected(false);
                    }}
                    className={`${
                      formStep === 0 ? 'hidden' : 'flex'
                    } sm:hidden items-center cursor-pointer text-company-blue space-x-2`}
                  >
                    <span>Terminar</span>
                    <FaCheck size={18} />
                  </button>

                  <button
                    type={patientVal ? 'button' : 'submit'}
                    onClick={() => {
                      // const isUserProfessional =
                      //     userRol?.uid ===
                      //     "ZWb0Zs42lnKOjetXH5lq";
                      // const shouldIncrementStep =
                      //     formStep === 0 ||
                      //     (!isUserProfessional &&
                      //         formStep === 5);
                      // setFormStep(
                      //     shouldIncrementStep
                      //         ? (prevStep: number) =>
                      //               prevStep + 1
                      //         : isUserProfessional
                      //         ? 6
                      //         : 5,
                      // );

                      if (patientVal) {
                        if (emailFound) {
                          emailFoundAlert();
                          return;
                        }
                        setFormStep((prevStep: number) => prevStep + 1);
                        return;
                        // setIsDataSelected(false);
                      }
                    }}
                    className={`${
                      // formStep > 4 parra mostrar ambos botones
                      formStep !== 0 ? 'hidden' : 'flex'
                    } sm:hidden items-center cursor-pointer text-company-blue`}
                  >
                    {isDataSelected || formStep === 0 ? (
                      (areaList.length > 0 ||
                        formStep < 5 ||
                        userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq') && (
                        <>
                          <span>Siguiente</span>
                          <BiChevronRight size={32} />
                        </>
                      )
                    ) : (
                      <>
                        <span>Omitir</span>
                        <BiChevronRight size={32} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
      {showHelp && (
        <>
          <div className='fixed lg:absolute top-[25%] sm:top-[22rem] right-[15%] sm:right-[5.5rem] 2xl:right-64 bg-white p-2 rounded-xl'>
            <div className='flex justify-end items-center'>
              <button type='button' onClick={() => setShowHelp(false)}>
                <MdClose color='gray' size={24} />
              </button>
            </div>
            <div className='flex items-center space-x-2 text-black pr-6 pb-5 text-justify'>
              <IoAlertCircleSharp
                className='text-company-orange sm:mx-4'
                size={40}
              />
              <p className='w-52 sm:w-64 text-xs sm:text-base'>
                  {helpMessages[formStep] || "No hay ayuda disponible para esta sección."}
              </p>
            </div>
          </div>
        </>
      )}
    </main>
  );
};
/*
Icono del doctor vector si se quiere de nuevo se agregaa despues de los div de en showhelp
<div className="fixed transition-transform right-16 bottom-8">
                        <DoctorVector className="w-48 sm:w-full" width="100%" />
                    </div>
*/
export default NewOrderPage;
