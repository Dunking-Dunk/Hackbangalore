import Header from '@/components/Header'
import { cn } from '@/lib/utils'
import React from "react"

const Layout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className='w-full h-screen'>
            <Header/>
            <div className="w-full h-full flex">
                {/* <Sidebar/> */}
                {children}
       </div>
        </div>
    )
}

export default Layout