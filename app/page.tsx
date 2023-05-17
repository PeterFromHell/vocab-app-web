'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'



const HomePage = () => {
  const {data: session} = useSession()
  return (
    <div className='bg-[#34353F] w-screen h-screen'>
      Home Page
      <img 
        onClick={() => signOut()}
        className='rounded-full w-12 m-3 absolute bottom-0 left-0 cursor-pointer'
        src={session?.user?.image!}
        alt='Profile Pic'
      />
      <div 
        className='rounded-full w-12 border border-spacing-2 absolute bottom-0 right-0 m-3'
      >
        <PlusIcon  className='text-[#FF7F50]'/>
      </div>
    </div>
  )
}

export default HomePage