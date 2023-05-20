'use client'
import React from 'react'
import NewVocab from '@/components/NewVocab'
import ToHome from '@/components/ToHome'
import CreateVocabPopupWindow from '@/components/CreateVocabPopupWindow'

type Props = {
    params: {
        id: string
    }
}

const ListPage: React.FC<Props> = ({params: {id} }: Props) => {
    const [openPopupWindow, setOpenPopupWindow] = React.useState(false)

    const popup = () => {
        setOpenPopupWindow(true)
    }
    const cancel = () => {
        setOpenPopupWindow(false)
    }
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            {openPopupWindow && (
                <CreateVocabPopupWindow handleClick={cancel} listId={id} />
            )}
            <NewVocab  handleClick={popup}/>
            <ToHome />
            <div className='border w-screen h-[5rem] absolute bottom-0 bg-[#00BFFF] flex items-center justify-center hover:opacity-80 cursor-pointer'>
                <p className='text-[2rem] text-[#FFFFFF]'>Open Vocab Cards</p>
            </div>
        </div>
    )
}

export default ListPage