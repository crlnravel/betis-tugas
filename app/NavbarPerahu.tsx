
'use client';

import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { FaBell } from 'react-icons/fa'

export default function NavbarPerahu() {
  return (
    <Navbar rounded className='p-7 bg-sky-100 dark:bg-sky-900'>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-2xl text-sky-900 font-bold dark:text-sky-300 italic">PerahuKami</span>
      </Navbar.Brand>
    </Navbar>
  );
}
