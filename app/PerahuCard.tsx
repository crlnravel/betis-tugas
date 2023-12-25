import { Button, Card } from 'flowbite-react';
import { Perahu } from './types';

type Props = { perahu: Perahu }

export default function PerahuCard({ perahu }: Props) {
  return (
    <Card className="max-w-sm p-0.5 bg-gradient-to-tr from-sky-200 to-sky-300 hover:scale-105 transition">
      <h5 className="text-xl italic font-bold tracking-tight text-gray-900 dark:text-white">
        {perahu.name}
      </h5>
      <p className={'text-right font-bold ' + (perahu.is_sailing ? 'text-red-600' : 'text-green-500')}>
        {perahu.is_sailing ? 'Sedang berlayar' : 'Tersedia'}
      </p>
    </Card>
  );
}
