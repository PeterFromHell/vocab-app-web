import React from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { DocumentData,  collection,  deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useSession } from 'next-auth/react'

type Props = {
    vocab: DocumentData
    vocabId: string
    listId: string
}

const VocabCard: React.FC<Props> = ({vocab, vocabId, listId}: Props) => {
    const { data: session } = useSession()
    const addStar = async () => {
        if (vocab.star < 5) {
            await setDoc(
                doc(
                    db,
                    'users',
                    session?.user?.email!,
                    'lists',
                    listId,
                    'vocabs',
                    vocabId
                ),
                {...vocab, star: vocab.star + 1}
            )
        }   
    }
    const removeVocab = async () => {
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
    }
    return (
        <div className=' bg-[#98FF98] w-[75rem] rounded-2xl flex flex-col pt-3 border-4'>
            <div className='w-[75rem] flex flex-row place-content-end pr-2'>
                <StarIcon  className={`w-[2rem] ${vocab.star >= 5 && 'bg-[#FFFF00]'}`}/>
                <StarIcon  className={`w-[2rem] ${vocab.star >= 4 && 'bg-[#FFFF00]'}`}/>
                <StarIcon  className={`w-[2rem] ${vocab.star >= 3 && 'bg-[#FFFF00]'}`}/>
                <StarIcon  className={`w-[2rem] ${vocab.star >= 2 && 'bg-[#FFFF00]'}`}/>
                <StarIcon  className={`w-[2rem] ${vocab.star >= 1 && 'bg-[#FFFF00]'}`}/>
            </div>
            <table className=' w-[75rem] border-4'>
                <tbody>
                    <tr>
                        <td className=' w-[45%]'>
                            <h1 className='text-[#006400] text-[2rem] mx-5'>{vocab?.english}</h1>
                        </td>
                        <td className=' w-[10%]'>            
                            <h1 className='text-[#006400] text-[2rem] mx-5'>{vocab.partOfSpeech}</h1>
                        </td>
                        <td className=' w-[45%] float-right'>            
                            <h1 className='text-[#006400] text-[2rem]'>{vocab.chinese}</h1>
                        </td>   
                    </tr>
                </tbody>
            </table>
            <div className='flex flex-row w-[75rem]'>
                {/* Star */}
                <div className='bg-[#FFFF00] text-[2rem] w-[50%] text-center rounded-bl-2xl hover:opacity-50 cursor-pointer' onClick={addStar}>Star</div>
                {/* Change */}
                {/* Delete */}
                <div className='bg-[#FF0000] text-[2rem] w-[50%] text-center rounded-br-2xl hover:opacity-90 cursor-pointer' onClick={removeVocab}>Delete</div>
            </div>

        </div>
    )
}

export default VocabCard