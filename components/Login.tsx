'use client'
import { signIn } from 'next-auth/react'
import React from 'react'

const Login = () => {
    return (
        <div className='w-screen h-screen bg-[#34353F] flex flex-col justify-center items-center'>
            <h1 className='text-[#B3C7D6] text-[5rem]'>Vocab App</h1>
            <button 
                onClick={() => signIn('google')}
                className='bg-[#98FF98] border rounded-xl w-[20rem] hover:opacity-50'
            >
                <p className='text-[#000000] text-[2rem]'>Log in to Get Started</p>
            </button>
        </div>
    )
}
export default Login