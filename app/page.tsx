'use client';
import PageHook from './hook/PageHook';
import Spinner from './component/spinner/Spinner';

const page = () => {
  PageHook();

  return <Spinner />;
};

export default page;
