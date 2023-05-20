import React from 'react'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const ToHome: React.FC = () => {
    return (
        <Link href='/'>
            <div
                className='rounded-full w-[4rem] border p-2 absolute bottom-[5rem] left-0 cursor-pointer m-3 hover:opacity-50'
            >
                <ArrowUturnLeftIcon className='text-[#FF7F50]'/>
            </div>
        </Link>
    )
}

export default ToHome