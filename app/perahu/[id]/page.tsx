'use client';

import React, { useEffect, useState } from 'react'
import { Perahu } from '../../types'
import axios from 'axios'
import NavbarPerahu from '../../NavbarPerahu'
import { Button, Card, List } from 'flowbite-react'
import { usePathname } from 'next/navigation';
import { FaBackward } from 'react-icons/fa';
import Link from 'next/link';

function Component() {
  const [detailPerahu, setDetailPerahu] = useState<Perahu>()

  const path = usePathname()

  const url = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : 'https://oprec-betis-be.up.railway.app/perahu'
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN
  
  useEffect(() => {
    const getDetail = async () => {
      try {
        const res = await axios.get(url + '/' + path.split('/')[2], {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        const data: Perahu = res.data.perahu

        setDetailPerahu(data)

      } catch (err) {
        console.log(err)
      }
    }

    getDetail()
  }, [])

  return (
    <>
      <NavbarPerahu />
      <main className='md:p-14 p-5'>
        <Link href={'/'}>
          <Button color='blue' pill><FaBackward /><span className='ml-3'>Back to home</span></Button>
        </Link>
        <Card className='max-w-2xl md:my-10 my-5 md:mx-3 mx-2'>
            {detailPerahu ? (<>
              <h2 className='text-4xl my-3 font-bold italic'>
                {detailPerahu.name}
              </h2>
              <p className='italic mb-10 text-xl text-slate-800'>
                "{detailPerahu.description}"
              </p>
              <p className='-m-2 mx-0 font-bold'>
                Spesifikasi:
              </p>
              <List unstyled className='p-3 text-sm text-black'>
                <List.Item>Nama: <span className='font-semibold'>{detailPerahu.name}</span></List.Item>
                <List.Item>Kapasitas: <span className='font-semibold'>{detailPerahu.capacity}</span></List.Item>
                <List.Item>Warna: <span className='font-semibold'>{detailPerahu.color}</span></List.Item>
                <List.Item>Dibeli pada: <span className='font-semibold'>{(new Date(detailPerahu.bought_at)).toUTCString()}</span></List.Item>
              </List>
              <p>
                Status: <span className={'font-semibold ' + (detailPerahu.is_sailing ? 'text-red-600' : 'text-green-500')}>{detailPerahu.is_sailing ? 'Sedang berlayar': 'Tersedia'}</span>
              </p>
              <div className='flex justify-between w-auto'>
                <Button outline gradientDuoTone={'pinkToOrange'} className='flex-grow m-2' >{detailPerahu.is_sailing ? 'Pulangkan' : 'Layarkan'}</Button>
                <Button outline gradientDuoTone={'greenToBlue'} className='flex-grow m-2'>Modifikasi</Button>
                <Button gradientMonochrome={'failure'} className='flex-grow m-2'>Jual</Button>
              </div>
            </>) : null}
        </Card>
      </main>
    </>
  )
}

export default Component