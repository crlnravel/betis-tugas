import axios from 'axios';
import { Alert, Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { HiInformationCircle } from 'react-icons/hi';

export default function FormBeliPerahu() {

  // URL dan accessToken untuk mengakses API
  const url = process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : 'https://oprec-betis-be.up.railway.app/perahu'
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN

  // State untuk mendapatkan warna dari API
	const [colors, setColors] = useState<string[]>()

  // State untuk nama perahu
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [capacity, setCapacity] = useState(0)
  const [color, setColor] = useState("")

  // State untuk cek apakah form sukses dikirim
  const [error, setError] = useState(false)

  // Ref hooks untuk input dari user
  const nameRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const capacityRef = useRef<HTMLInputElement>(null)
  const colorRef = useRef<HTMLSelectElement>(null)

  const beliPerahu = async () => {
    const name = nameRef.current ? nameRef.current.value : ''
    const description = descriptionRef.current ? descriptionRef.current.value : ''
    const capacity = capacityRef.current ? parseInt(capacityRef.current.value) : 0
    const color = colorRef.current ? colorRef.current.value : ''


    console.log({name, description, capacity, color})
    
    try {
      const res = await axios.post(url, {name, description, capacity, color}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      
      if (res.status != 201) {
        console.log(res.data)
        setError(true)
        return
      }
      
    } catch (err) {
      setError(true)
      return
    }

    setError(false)
  }

  // Meminta warna yang tersedia pada server
	useEffect(() => {
		const getColor = async () => {
			const res = await axios.get(url + '/warna', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      setColors(res.data.daftarWarna)
		}

    getColor()
	}, [])

  return (
    <form className="flex w-1/3 flex-col gap-4" onSubmit={beliPerahu}>
      {error ? 
        <Alert color="failure" icon={HiInformationCircle}>
          <span className="font-medium">Error!</span> Coba ganti input atau tunggu beberapa saat lagi.
        </Alert> :
        null
      }
      <div>
        <div className="mb-2 block">
          <Label htmlFor="boatname" value="Nama perahu" />
        </div>
        <TextInput id="boatname" type="text" ref={nameRef} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Deskripsi" />
        </div>
        <Textarea id="description" ref={descriptionRef} required rows={4} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="capacity" value="Kapasitas" />
        </div>
        <TextInput id="capacity" type="number" ref={capacityRef} required />
      </div>
      <div>
        <div className="mb-2 block">
            <Label htmlFor="warnaperahu" value="Warna" />
        </div>
        <Select id="warnaperahu" ref={colorRef} required>
            {colors?.map((color: string) => <option key={color}>{color}</option>)}
        </Select>
      </div>
      <Button type="submit">Beli Perahu</Button>
    </form>
  );
}