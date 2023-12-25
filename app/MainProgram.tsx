'use client';

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Avatar, Blockquote, Rating, Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { MdDashboard } from 'react-icons/md';
import { Perahu } from './types'
import PerahuCard from './PerahuCard'
import FormBeliPerahu from './FormBeliPerahu';
import Link from 'next/link';

function MainProgram() {
	
  const url = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : 'https://oprec-betis-be.up.railway.app/perahu'
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

  const [jumlahPerahu, setJumlahPerahu] = useState(0)
  const [daftarPerahu, setDaftarPerahu] = useState<Perahu[]>([])

  useEffect( () => {

    /* Fungsi untuk memanggil API untuk mendapatkan data perahu */
    async function getData () {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      const { jumlahPerahu: jumlah, daftarPerahu: daftar }: {jumlahPerahu: number, daftarPerahu: Perahu[]} = res.data

      setJumlahPerahu(jumlah)
      setDaftarPerahu(daftar)
    }

    getData()
  }, [])

  return (
		<Tabs aria-label="Tabs with underline" style="default" className="px-10 md:m-0 sm:m-auto sm:px-5">
      <Tabs.Item active title="Home" icon={HiUserCircle}>
        <div className='grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-5'>
          {daftarPerahu.map((perahu: Perahu) => 
            <Link href={`/perahu/${perahu.id}`}>
              <PerahuCard perahu={perahu} />
            </Link>
          )}
        </div>
      </Tabs.Item>
      <Tabs.Item title="Beli Perahu" icon={MdDashboard}>
				<div className='px-10 py-5 flex justify-evenly'>
					<FormBeliPerahu />
					<figure className="max-w-md">
						<div className="mb-4 flex items-center">
							<Rating size="md">
								<Rating.Star />
								<Rating.Star />
								<Rating.Star />
								<Rating.Star />
								<Rating.Star />
							</Rating>
						</div>
						<Blockquote>
							<p className="text-2xl font-semibold text-gray-900 dark:text-white">
								"<span className='font-bold text-sky-900 font-extrabold dark:text-sky-300'>PerahuKami</span> benar-benar luar biasa! Memiliki koleksi perahu terlengkap dan terbaik. Pilihan yang tepat untuk para pemilik pelabuhan besar!"
							</p>
						</Blockquote>
						<figcaption className="mt-6 flex items-center space-x-3">
							<div className="flex items-center divide-x-2 divide-gray-300 dark:divide-gray-700">
								<cite className="pr-3 font-medium text-gray-900 dark:text-white">Pak Esde, S.Kom</cite>
								<cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">Bajak Laut</cite>
							</div>
						</figcaption>
					</figure>
				</div>
      </Tabs.Item>
      <Tabs.Item title="Statistik" icon={HiAdjustments}>
        This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.
      </Tabs.Item>
    </Tabs>
  )
}

export default MainProgram