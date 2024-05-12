import Header from '@/components/Header'

import React from "react"

const Layout = ({children}: {
    children: React.ReactNode
}) => {
    return (
        <div className='w-full h-screen'>
            <Header/>
            <div className="w-full flex flex-row">
                <div className='px-6 py-4 w-full h-full'>
                {children}
                </div>
               
       </div>
        </div>
    )
}

export default Layout