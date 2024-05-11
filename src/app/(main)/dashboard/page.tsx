"use client"

import React from 'react'
// import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { useSession } from 'next-auth/react'

export default function HomePage() {
    const { data } = useSession()
    
        return (
            <main className='w-full h-full'>
                <div>Protected Dashboard, hello: {data?.user.username}</div>
            </main>
        )
    
}