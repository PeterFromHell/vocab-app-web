import { signOut } from 'next-auth/react'
import React from 'react'

type Props = {
    profilePic: string
}

const Logout = ({profilePic}: Props) => {
    return (
        <img
            onClick={() => signOut()}
            className='rounded-full w-12 m-3 absolute bottom-0 left-0 cursor-pointer'
            src={profilePic}
            alt='Profile Pic'
        />
    )
}
export default Logout