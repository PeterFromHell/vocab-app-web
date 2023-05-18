'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import NewList from '@/components/NewList'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { List } from '@/typings'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'




const HomePage = () => {
  const { data: session } = useSession()
  const [open, setOpen] = React.useState(false)
  const [prompt, setPrompt] = React.useState('')
  const router = useRouter()

  const popupWindow = () => {
    setOpen(true)
  }

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
    <div className='bg-[#34353F] w-screen h-screen flex flex-row items-center justify-center'>
      <h1 className='text-white absolute top-0 text-[6rem]'>Vocab List</h1>

      {open && (
        <div className='border w-[30rem] h-[20rem] rounded-3xl relative'>
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
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <img 
        onClick={() => signOut()}
        className='rounded-full w-12 m-3 absolute bottom-0 left-0 cursor-pointer'
        src={session?.user?.image!}
        alt='Profile Pic'
      />
      <NewList handleClick={popupWindow}/>
    </div>
  )
}

export default HomePage