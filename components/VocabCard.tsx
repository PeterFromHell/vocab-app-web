import React from 'react'

const VocabCard = ({vocab}: any) => {
    return (
        <div className='border w-[75rem] rounded-2xl flex flex-row items-center justify-between p-2'>
            <h1 className='text-white text-[2rem]'>{vocab.english}</h1>
            <h1 className='text-white text-[2rem]'>{vocab.chinese}</h1>
            <h1 className='text-white text-[2rem]'>{vocab.partOfSpeech}</h1>
        </div>
    )
}

export default VocabCard