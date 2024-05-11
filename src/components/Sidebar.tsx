import Link from "next/link"
import Image from "next/image"
import Logo from '../../public/icon/logo.png'
import { Separator } from "@/components/ui/separator"

const Sidebar = () => {
    return (
        <div className="w-1/5 h-[calc(100vh-5.3rem)] sticky top-0 left-0 bg-accent rounded-md py-6">
            <div className="w-full  flex flex-col gap-4">
                <div className="px-6 w-full">
                <Link href={'/dashboard'}>Dashboard</Link>
                </div>
                <Separator />
                <div className="px-6  w-full">
                <Link href={'/dashboard-loan'}>Loan</Link>
                </div>
                <Separator />

            </div>
        </div>
    )
}

export default Sidebar