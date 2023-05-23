'use client'
import React from 'react'

const VocabPage = () => {
    const [flip, setFlip] = React.useState(false)
    const flipCard = () => {
        setFlip(prevState => !prevState)
    }
    return (
        <div className='h-full w-full grid place-items-center'>
            <div className={`w-[75rem] h-[35rem] border bg-[#B7C6D4] rounded-[4rem] flex items-center justify-center mt-4 ${flip && 'rotateCard'} duration-500`} onClick={flipCard}>
                <h1 className='text-center text-[10rem]'>Content</h1>
            </div>
        </div>
    )
}

export default VocabPage