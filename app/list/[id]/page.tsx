'use client'
import React from 'react'
import Link from 'next/link'
import NewVocab from '@/components/NewVocab'
import ToHome from '@/components/ToHome'
import CreateVocabPopupWindow from '@/components/CreateVocabPopupWindow'
import { useSession } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { usePathname } from 'next/navigation'
import VocabCard from '@/components/VocabCard'

type Props = {
    params: {
        id: string
    }
}

const ListPage: React.FC<Props> = ({params: {id} }: Props) => {
    const [openPopupWindow, setOpenPopupWindow] = React.useState(false)
    const { data: session } = useSession()
    const [vocabs, loading] = useCollection(
        session && query(
            collection(db, 'users', session.user?.email!, 'lists', id, 'vocabs'),
            orderBy('star', 'desc'),
        )
    )

    const popup = () => {
        setOpenPopupWindow(true)
    }
    const cancel = () => {
        setOpenPopupWindow(false)
    }
    return (
        <>
            <div className='w-screen h-screen flex flex-col items-center justify-center overflow-x-clip'>
                {openPopupWindow && (
                    <CreateVocabPopupWindow handleClick={cancel} listId={id} />
                )}
                <div className='absolute space-y-5 my-5'>
                    {vocabs?.docs.map(vocab => (
                        <VocabCard vocab={vocab.data()} key={vocab.id} vocabId={vocab.id} listId={id}/>                    ))}
                </div>
                <NewVocab  handleClick={popup}/>
                <ToHome />
            </div>
            <div className='w-full h-[30rem] bg-white'>a</div>
            <Link href={`/list/${id}/vocab`} className=' border w-full h-[5rem] fixed bottom-0 bg-[#00BFFF] flex items-center justify-center hover:opacity-80 cursor-pointer overflow-x-clip'>
                <p className='text-[2rem] text-[#FFFFFF]'>Open Vocab Cards</p>
            </Link>
        </>
    )
}

export default ListPage