import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { currentUser } from '@/lib/actions'

export default async function HomePage() {
    const session = await getServerSession(authOptions)
    const user = await currentUser(session?.user?.id)


        return (
            <main className='w-full h-full'>
                <div>Protected Dashboard, hello: Hursun</div>
            </main>
        )
    
}