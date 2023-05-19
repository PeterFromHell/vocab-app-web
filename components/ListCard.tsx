import { DocumentData, deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { db } from '@/firebase'
import { useSession } from 'next-auth/react'

type Props = {
    list: DocumentData
    handleClick: () => void
}

const ListCard = ({list, handleClick}: Props) => {
    
    return (
        <div className='border w-[30rem] h-[15rem] rounded-3xl'>
            <h2 className='text-white m-4 text-[5rem]'>{list.name}</h2>
            <div className='flex flex-row  items-center justify-between'>
                {/* Date not completely good. Modify it in the future. 5/20/2023. */}
                <p className='text-white text-[1.5rem] m-4'>{`Created: ${new Date(list.createdAt.seconds * 1000).toDateString()}`}</p>
                <TrashIcon onClick={handleClick} className='text-white w-8 m-4' />
            </div>
        </div>
    )
}

export default ListCard