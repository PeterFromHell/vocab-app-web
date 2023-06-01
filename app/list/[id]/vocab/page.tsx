'use client'
import { db } from '@/firebase'
import { useRandomArray } from '@/hooks/useRandomArray'
import { collection, query, getDoc, doc, getDocs, QuerySnapshot, DocumentData, onSnapshot, deleteDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

interface Vocabulary {
    English: string
    Chinese: string
    PartOfSpeech: string
    vocabId: string
}

type Props = {
    params: {
        id: string
    }
}

const VocabPage = ({params: {id}}: Props) => {
    const { data: session } = useSession()
    const [flip, setFlip] = React.useState<boolean>(false)
    const [currentVocab, setCurrentVocab] = React.useState<Vocabulary | null>(null)
    const listId: string = id

    const [array, setArray] = useState<Vocabulary[]>([])
    const [vocabId, setVocabId] = useState<string>('')

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
                        PartOfSpeech: doc.data().partOfSpeech,
                        vocabId: doc.id
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
            setVocabId(removedItem.vocabId)
        } else {
            alert('the array is empty!')
        }
    }, [array])

    const deleteVocab = useCallback(async () => {
        await deleteDoc(
            doc(
                db,
                'users',
                session?.user?.email!,
                'lists',
                listId,
                'vocabs',
                vocabId
            )
        )
        nextVocab()
    }, [vocabId])


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
                <div className='w-1/3 border h-full bg-red-500 cursor-pointer'><p className='text-[#000000] text-center text-[3rem]' onClick={deleteVocab}>Delete</p></div>
                <div className='w-1/3 border h-full bg-yellow-300'><p className='text-[#000000] text-center text-[3rem]'>Star</p></div>
                <div className='w-1/3 border h-full bg-[#00BFFF] cursor-pointer' onClick={nextVocab}><p className='text-[#000000] text-center text-[3rem]'>Next</p></div>
            </div>
        </div>
    )
}

export default VocabPage