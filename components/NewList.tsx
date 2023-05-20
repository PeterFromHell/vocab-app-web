import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'

type Props = {
    handleClick: () => void
}

const NewList: React.FC<Props> = ({handleClick}: Props) => {
    return (
        <div 
            className='rounded-full w-[4rem] border border-spacing-2 absolute bottom-0 right-0 m-3 cursor-pointer hover:opacity-50'
            onClick={handleClick}
        >
            <PlusIcon  className='text-[#FF7F50]'/>
        </div>
    )
}
export default NewList