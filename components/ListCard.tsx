import React from 'react'
import { DocumentData, deleteDoc, doc } from 'firebase/firestore'
import { TrashIcon } from '@heroicons/react/24/outline'
import { db } from '@/firebase'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {
    list: DocumentData
    id: string
}

const ListCard = ({list, id}: Props) => {
    const { data: session } = useSession()
    const router = useRouter()
    const removeList = async () => {
        await deleteDoc(
            doc(
                db, 'users', session?.user?.email!, 'lists', id
            )
        )
        router.replace('/')
    }
    
    return (
        <div className='border w-[30rem] h-[15rem] rounded-3xl bg-[#98FF98]'>
            <h2 className='text-[#006400] m-4 text-[5rem]'>{list.name}</h2>
            <div className='flex flex-row  items-center justify-between'>
                {/* Date not completely good. Modify it in the future. 5/20/2023. */}
                <p className='text-[#333333] text-[1.5rem] m-4'>{`Created: ${new Date(list.createdAt.seconds * 1000).toDateString()}`}</p>
                <TrashIcon onClick={removeList} className='text-[#333333] w-8 m-4' />
            </div>
        </div>
    )
}

export default ListCard