'use client'
import { db } from '@/firebase'
import { useRandomArray } from '@/hooks/useRandomArray'
import { collection, query, getDoc, doc, getDocs, QuerySnapshot, DocumentData, onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

type VocabRef = QuerySnapshot<DocumentData> | undefined

const VocabPage = async () => {
    const { data: session } = useSession()
    const [flip, setFlip] = React.useState(false)
    const [vocabCount, setVocabCount] = React.useState()
    const pathname = usePathname()
    const listId: string = pathname.slice(6).slice(0, 20)

    const testArray = [{English:'a',Chinese:'A',}, {English:'b',Chinese:'B',}, {English:'c',Chinese:'C',}, {English:'d',Chinese:'D',}, {English:'e',Chinese:'E',}, {English:'f',Chinese:'F',}]
    const shuffleTestArray = useRandomArray(testArray)
    console.log(shuffleTestArray)
    const nextVocab = () => {

    }

    const array: any[] = []

    const unsubscribe = onSnapshot(
        query(
            collection(db, 'users', session?.user?.email!, 'lists', listId, 'vocabs')
        ), (snapshot) => {
            snapshot.forEach((doc) => {
                array.push({English: doc.data().english, Chinese: doc.data().chinese, PartOfSpeech: doc.data().partOfSpeech})
            });
            unsubscribe()
        }
    )
    const shuffledArray = useRandomArray(array)
    console.log(shuffledArray)


    const flipCard = () => {
        setFlip(prevState => !prevState)
    }
    return (
        <div className='h-screen w-screen grid place-items-center'>
            <div className={`w-[75rem] h-[35rem] border bg-[#B7C6D4] rounded-[4rem] flex items-center justify-center mt-4 ${flip && 'rotateCard'} duration-500`} onClick={flipCard}>
                <h1 className='text-center text-[10rem]'>{vocabCount}</h1>
            </div>
            <div className='h-[5rem] w-screen absolute bottom-0 flex flex-row items-center justify-center'>
                <div className='w-1/3 border h-full bg-red-500'>a</div>
                <div className='w-1/3 border h-full bg-yellow-300'>a</div>
                <div className='w-1/3 border h-full bg-[#00BFFF]' onClick={nextVocab}><p className='text-[#000000] text-center text-[3rem]'>Next</p></div>
            </div>
        </div>
    )
}

export default VocabPage