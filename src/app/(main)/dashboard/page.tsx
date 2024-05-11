"use client"

import React, { useEffect } from 'react'
// import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import { currentUser } from '@/lib/actions'

export default function HomePage() {
    const { data } = useSession()
    
    useEffect(() => {
        const helper = async() => {
            const user = await currentUser(data?.user?.id)
            console.log(user)
        }
        if (data?.user)
            helper()
    }, [data])

        return (
            <main className='w-full h-full p-6'>
                <div>Protected Dashboard, hello: {data?.user.username}</div>
            </main>
        )
    
}