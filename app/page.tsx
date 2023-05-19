'use client'
import { useSession } from 'next-auth/react'
import React from 'react'
import NewList from '@/components/NewList'
import PopupWindow from '@/components/PopupWindow'
import Logout from '@/components/Logout'
import ListCard from '@/components/ListCard'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from '@/firebase'
import Link from 'next/link'

const HomePage: React.FC = () => {
  const [ openPopupWindow, setOpenPopupWindow ] = React.useState(false)
  const { data: session } = useSession()
  const [lists, loading, error ] = useCollection(
    session && query(
      collection(db, 'users', session.user?.email!, 'lists'),
      orderBy('createdAt', 'asc')
    )
  )

  const removeList = async () => {
    //await deleteDoc(doc(db, 'users', session?.user?.email!, 'lists', list.id))
  }

  const popupWindow = () => {
    setOpenPopupWindow(true)
  }
  const handleState = () => {
    setOpenPopupWindow(false)
  }
  
  return (
    <div className='bg-[#34353F] w-screen h-screen flex flex-row items-center justify-center'>
      <h1 className='text-white absolute top-0 text-[6rem]'>Vocab List</h1>

      {openPopupWindow && (
        <PopupWindow change={handleState} />
      )}
      <div className='absolute top-[8rem] border flex flex-wrap w-[75rem] justify-around'>
        {lists?.docs.map(list => (
          <Link className='py-5' href={`/list/${list.id}`} key={list.id}>
            <ListCard key={list.id} list={list.data()} handleClick={removeList}/>
          </Link>
        ))}
      </div>
      <Logout profilePic={session?.user?.image!}/>
      <NewList handleClick={popupWindow}/>
    </div>
  )
}

export default HomePage