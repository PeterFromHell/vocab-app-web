'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import NewList from '@/components/NewList'
import PopupWindow from '@/components/PopupWindow'
import Logout from '@/components/Logout'





const HomePage = () => {
  const [ open, setOpen ] = React.useState(false)
  const { data: session } = useSession()

  const popupWindow = () => {
    setOpen(true)
  }
  const handleState = () => {
    setOpen(false)
  }
  
  return (
    <div className='bg-[#34353F] w-screen h-screen flex flex-row items-center justify-center'>
      <h1 className='text-white absolute top-0 text-[6rem]'>Vocab List</h1>

      {open && (
        <PopupWindow change={handleState} />
      )}
      <Logout profilePic={session?.user?.image!}/>
      <NewList handleClick={popupWindow}/>
    </div>
  )
}

export default HomePage