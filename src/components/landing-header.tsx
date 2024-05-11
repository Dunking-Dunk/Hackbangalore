import Link from 'next/link'

import { ModeToggle } from '@/components/toggle-mode'
import Image from 'next/image'
import Logo from '../../public/icon/logo.png'

const Header = ({ classname }: {
    classname?: string
}) => {
    return (
        <div className={`${classname} w-full h-18 md:px-20 px-4 py-4 z-50`}>
            <div className='flex flex-row justify-between'>
                <div>
                    <Link href='/'>
                        <Image src={Logo} alt='logo of the app' className='h-14 w-14 cursor-pointer' />
                    </Link>
                </div>
                <div className='flex flex-row'>
                    <ModeToggle />
                </div>
            </div>
        </div>

    )
}

export default Header