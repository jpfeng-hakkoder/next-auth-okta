'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthButton() {    
    const { status } = useSession()
    const [label, setLabel] = useState(status === 'authenticated' ? 'Sign out' : 'Sign in')

    async function handleClick() {
        if (status === 'authenticated') {
            await signOut()
        } else {            
            await signIn('okta', { callbackUrl: '/' })
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            setLabel('Sign out')
        }
    }, [status])

    return (
        <button
            className='p-2 rounded bg-cyan-700'
            onClick={handleClick}
        >
            { label }
        </button>
    )
}