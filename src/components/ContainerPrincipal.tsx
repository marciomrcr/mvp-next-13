import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { ReactElement } from 'react';

interface Props {
  title: ReactElement;
  children: any;
}
const ContainerPrincipal = () => {
  const router = Router;
  return (
    <>
      <div className='w-full'>
        <div className='w-full min-h-screen bg-gray-200 p-6'>
          <h1 className='font-bold text-xl text-center md:text-3xl md:mt-12 mb-2'>
            Dashboard - <span className='text-blue-900'>Aimée Stylus</span>
          </h1>
          {/* -----card Container----- */}
          <div className='flex flex-wrap justify-center'>
            <div className='flex flex-col items-center bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52'>
              <Image
                src='/logo.png'
                alt='Logo'
                width={20}
                height={20}
                className='h-20 m-6'
              />
              <h3 className='px-2 pb-1 text-center'>Vendas</h3>
              <a
                href='#'
                className='bg-blue-900 w-full  sm:text-sm md:text-sm lg:text-xl text-white p-3 text-center hover:bg-blue-500 transition-all duration-500 text-decoration-none'
              >
                R$ 5000.00
              </a>
            </div>
            <Link href={'/categorias'}>
              <div className='flex flex-col items-center bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52'>
                <Image
                  src='/logo.png'
                  alt='Logo'
                  width={20}
                  height={20}
                  className='h-20 m-6'
                />
                <h3 className='px-2 pb-1 text-center'>Vendas</h3>
                <a
                  href='#'
                  className='bg-blue-900 w-full  sm:text-sm md:text-sm lg:text-xl text-white p-3 text-center hover:bg-blue-500 transition-all duration-500 text-decoration-none'
                >
                  R$ 5000.00
                </a>
              </div>{' '}
            </Link>
            <div className='flex flex-col items-center bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52'>
              <Image
                src='/logo.png'
                alt='Logo'
                width={20}
                height={20}
                className='h-20 m-6'
              />
              <h3 className='px-2 pb-1 text-center'>Vendas</h3>
              <a
                href='#'
                className='bg-blue-900 w-full  sm:text-sm md:text-sm lg:text-xl text-white p-3 text-center hover:bg-blue-500 transition-all duration-500 text-decoration-none'
              >
                R$ 5000.00
              </a>
            </div>
            <div className='flex flex-col items-center bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52'>
              <Image
                src='/logo.png'
                alt='Logo'
                width={20}
                height={20}
                className='h-20 m-6'
              />
              <h3 className='px-2 pb-1 text-center'>Vendas</h3>
              <a
                href='#'
                className='bg-blue-900 w-full  sm:text-sm md:text-sm lg:text-xl text-white p-3 text-center hover:bg-blue-500 transition-all duration-500 text-decoration-none'
              >
                R$ 5000.00
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerPrincipal;
