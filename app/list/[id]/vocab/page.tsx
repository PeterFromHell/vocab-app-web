'use client'
import { db } from '@/firebase'
import { useRandomArray } from '@/hooks/useRandomArray'
import { collection, query, getDoc, doc, getDocs, QuerySnapshot, DocumentData, onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

interface Vocabulary {
    English: string
    Chinese: string
    PartOfSpeech: string
}

const VocabPage = () => {
    const { data: session } = useSession()
    const [flip, setFlip] = React.useState(false)
    const [currentVocab, setCurrentVocab] = React.useState<Vocabulary | null>(null)
    const pathname = usePathname()
    const listId: string = pathname.slice(6).slice(0, 20)

    const [array, setArray] = useState<Vocabulary[]>([])

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'users', session?.user?.email!, 'lists', listId, 'vocabs')
            ), (snapshot) => {
                const fetchedArray: Vocabulary[] = []
                snapshot.forEach((doc) => {
                    fetchedArray.push({
                        English: doc.data().english,
                        Chinese: doc.data().chinese,
                        PartOfSpeech: doc.data().partOfSpeech
                    })
                })
                setArray(fetchedArray)
            }
        )
        return () => {
            unsubscribe()
        }
    }, [])

    const nextVocab = useCallback(() => {
        if ( array.length > 0 ) {
            const randomNumber = Math.floor(Math.random() * array.length)
            const newArray = [...array]
            const removedItem = newArray.splice(randomNumber, 1)[0]
            setArray(newArray)
            setCurrentVocab(removedItem)
        } else {
            alert('the array is empty!')
        }
    }, [array])


    const flipCard = () => {
        setFlip(prevState => !prevState)
    }
    return (
        <div className='h-screen w-screen grid place-items-center'>
            <div className={`w-[75rem] h-[35rem] border bg-[#B7C6D4] rounded-[4rem] flex flex-col items-center justify-center mt-4 ${flip && 'rotateCard'} duration-500`} onClick={flipCard}>
                <h1 className={`text-center text-[10rem] ${flip && 'rotate-text'}`}>{!flip ? currentVocab?.English : currentVocab?.Chinese}</h1>
                <p className={`text-center text-[3.5rem] ${flip && 'rotate-text'}`}>{currentVocab?.PartOfSpeech}</p>
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