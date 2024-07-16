'use client'

import { signIn } from 'next-auth/react'

export default function LoginButton() {
    
    return (
        <button
            className='p-2 rounded bg-cyan-700'
            onClick={() => signIn('okta')}
        >
            Log In
        </button>
    )
}