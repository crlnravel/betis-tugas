import React, {  } from 'react'
import NavbarPerahu from './NavbarPerahu'
import SearchBar from './SearchBar'
import MainProgram from './MainProgram'

// Program utama
async function page() {

  return (
    <>
      <NavbarPerahu />
      <main className='p-10'>
        <MainProgram />
      </main>
    </>
  )
}

export default page