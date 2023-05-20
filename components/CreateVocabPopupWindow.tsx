'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { Vocab } from '@/typings'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/firebase'

type Props = {
    handleClick: () => void
    listId: string
}

const CreateVocabPopupWindow: React.FC<Props> = ({handleClick, listId}: Props) =>{
    const [ engPrompt, setEngPrompt] = React.useState('')
    const [ chiPrompt, setChiPrompt] = React.useState('')
    const [ partPrompt, setPartPrompt] = React.useState('')
    const { data: session } = useSession()

    const createNewVocab = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!engPrompt || !chiPrompt || !partPrompt) return

        const eng = engPrompt.trim()
        setEngPrompt('')
        const chi = chiPrompt.trim()
        setChiPrompt('')
        const part = partPrompt.trim()
        setPartPrompt('')

        const vocab: Vocab = {
            english: eng,
            chinese: chi,
            partOfSpeech: part,
            star: 0
        }

        await addDoc(
            collection(
                db,
                'users',
                session?.user?.email!,
                'lists',
                listId,
                'vocabs'
            ),
            vocab
        )
    }


    return (
        <div className='w-[35rem] h-[25rem] rounded-3xl relative bg-[#333333] z-10'>
            <span className='text-white text-[2rem] m-6'>New Vocab Word</span>
            <form onSubmit={createNewVocab}>
                <div className='flex flex-col items-start justify-center'>
                    <span className='text-white mx-8 my-1 text-[1.5rem]'>English</span>
                    <input
                        className='bg-transparent focus:outline-none border w-[25rem] h-[2rem] rounded-lg mx-8 my-1 p-2 text-white'
                        type='input'
                        value={engPrompt}
                        onChange={e => setEngPrompt(e.target.value)}
                    />
                    <span className='text-white mx-8 my-1 text-[1.5rem]'>Chinese</span>
                    <input
                        className='bg-transparent focus:outline-none border w-[25rem] h-[2rem] rounded-lg mx-8 my-1 p-2 text-white'
                        type='input'
                        value={chiPrompt}
                        onChange={e => setChiPrompt(e.target.value)}
                    />
                    <span className='text-white mx-8 my-1 text-[1.5rem]'>Part of Speech</span>
                    <input
                        className='bg-transparent focus:outline-none border w-[25rem] h-[2rem] rounded-lg mx-8 my-1 p-2 text-white'
                        type='input'
                        value={partPrompt}
                        onChange={e => setPartPrompt(e.target.value)}
                        placeholder='(n. v. adj. adv. prep. phrase. ...)'
                    />
                </div>
                <button 
                    className='border bg-red-700 hover:opacity-50 text-white w-[6rem] h-[2rem] rounded-lg m-6 absolute bottom-0 right-0 cursor-pointer'
                >
                    Create
                </button>
                <button
                    className='border bg-gray-500 hover:opacity-50 text-white w-[6rem] h-[2rem] rounded-lg m-6 absolute bottom-0 right-[7rem] cursor-pointer'
                    type='button'
                    onClick={handleClick}
                >
                    Cancel
                </button>
            </form>
        </div>
    )
}
export default CreateVocabPopupWindow