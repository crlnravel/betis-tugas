
'use client';

import { FloatingLabel } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';

export default function Component() {
  return (
    <div className="grid grid-flow-col items-center justify-start gap-x-5 p-5 pl-20 text-teal-600">
      <FloatingLabel variant="standard" label='' sizing='sm' />
			<FaSearch />
    </div>
  );
}
