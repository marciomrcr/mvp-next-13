import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: 'Dashboard', src: 'Chart_fill' },
    { title: 'Inbox', src: 'Chat' },
    { title: 'Accounts', src: 'User', gap: true },
    { title: 'Schedule ', src: 'Calendar' },
    { title: 'Search', src: 'Search' },
    { title: 'Analytics', src: 'User' },
    { title: 'Files ', src: 'Folder', gap: true },
    { title: 'Setting', src: 'Setting' },
  ];

  return (
    <>
      <div className='flex'>
        <div
          className={` ${
            open ? 'w-71' : 'w-20 '
          } bg-dark-purple h-screen px-2  pt-8 relative duration-300`}
        >
          <Image
            src='/control.png'
            alt='Logo'
            width={40}
            height={40}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
         border-2 rounded-full  ${!open && 'rotate-180'}`}
            onClick={() => setOpen(!open)}
          />

          <div className='flex gap-x-1 items-center'>
            <Image
              src='/logo.png'
              alt='Logo'
              width={24}
              height={24}
              className={`cursor-pointer duration-500 ${
                open && 'rotate-[360deg]'
              }`}
            />

            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && 'scale-0'
              }`}
            >
              Aimée Stylus
            </h1>
          </div>
          <ul className='pt-2'>
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? 'mt-6' : 'mt-2'} ${
                  index === 0 && 'bg-light-white'
                } `}
              >
                <Image
                  src={`/${Menu.src}.png `}
                  alt='Logo'
                  width={24}
                  height={24}
                  className=''
                />

                <span
                  className={`${!open && 'hidden'} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-screen flex-1 p-7'></div>
      </div>
    </>
  );
}
