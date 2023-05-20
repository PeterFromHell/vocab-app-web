'use client'
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import NewList from '@/components/NewList'
import PopupWindow from '@/components/PopupWindow'
import Logout from '@/components/Logout'
import ListCard from '@/components/ListCard'
import { db } from '@/firebase'
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

const HomePage: React.FC = () => {
  const [ openPopupWindow, setOpenPopupWindow ] = React.useState(false)
  const { data: session } = useSession()
  const [lists, loading, error ] = useCollection(
    session && query(
      collection(db, 'users', session.user?.email!, 'lists'),
      orderBy('createdAt', 'asc')
    )
  )

  const popupWindow = () => {
    setOpenPopupWindow(true)
  }
  const handleState = () => {
    setOpenPopupWindow(false)
  }
  
  return (
    <div className='bg-[#34353F] w-screen h-screen flex flex-row items-center justify-center overflow-auto'>
      <h1 className='text-[#B7C6D4] absolute top-0 text-[6rem]'>Vocab List</h1>

      {openPopupWindow && (
        <PopupWindow change={handleState} />
      )}
      <div className='absolute top-[8rem] flex flex-wrap w-[75rem] justify-around'>
        {lists?.docs.map(list => (
          <Link className='py-5' href={`/list/${list.id}`} key={list.id}>
            <ListCard key={list.id} id={list.id} list={list.data()} />
          </Link>
        ))}
      </div>
      <Logout profilePic={session?.user?.image!}/>
      <NewList handleClick={popupWindow}/>
    </div>
  )
}

export default HomePage