import { Button, Card } from 'flowbite-react';
import { Perahu } from './types';

type Props = { perahu: Perahu }

export default function PerahuCard({ perahu }: Props) {
  return (
    <Card className="max-w-xs h-48 bg-gradient-to-tr from-sky-200 to-sky-300 hover:scale-105 hover:cursor-pointer transition">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {perahu.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 truncate">
        {perahu.description}
      </p>
      <p className={'text-right font-bold' + perahu.is_sailing ? 'text-green-500' : 'text-red-600'}>
        {perahu.is_sailing ? 'Sedang berlayar' : 'Tersedia'}
      </p>
    </Card>
  );
}
