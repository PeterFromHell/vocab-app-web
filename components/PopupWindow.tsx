'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db} from '@/firebase'
import { List } from '@/typings'

type Props = {
    change: any
}

const PopupWindow: React.FC<Props> = ({change}:Props) => {
    const [prompt, setPrompt] = React.useState('')
    const { data: session } = useSession()
    const router = useRouter()

    const createNewList = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!prompt) return
    
        const input = prompt.trim()
        setPrompt('')
    
        const list: List = {
          name: input,
          createdAt: serverTimestamp(),
          user: {
            _id: session?.user?.email!,
            name: session?.user?.name!,
            avatar: session?.user?.image || 
              `https://ui-avatars.com/api/?name=${session?.user?.name}`,
          },
        }
        console.log('submitted')
        const doc = await addDoc(
          collection(
            db,
            'users',
            session?.user?.email!,
            'lists'
          ),
          list
        )
        router.push(`/list/${doc.id}`)
    } 

    return (
        <div className='w-[30rem] h-[20rem] rounded-3xl relative bg-[#333333] z-10'>
          <span className='text-white text-[2rem] m-6'>Name of your new list:</span>

          <form onSubmit={createNewList}>
            <input 
              className='bg-transparent focus:outline-none border w-[25rem] h-[2rem] rounded-lg m-8 p-2 text-white'
              type='text'
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='List Name'
            />
            <button
              className='border bg-red-700 hover:opacity-50 text-white w-[6rem] h-[2rem] rounded-lg m-6 absolute bottom-0 right-0 cursor-pointer'
            >
              Create
            </button>
            <button
              type='button'
              className='border bg-gray-500 hover:opacity-50 text-white w-[6rem] h-[2rem] rounded-lg m-6 absolute bottom-0 right-[7rem] cursor-pointer'
              onClick={() => change()}
            >
              Cancel
            </button>
          </form>
        </div>
    )
}

export default PopupWindow