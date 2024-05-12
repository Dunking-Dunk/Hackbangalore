import { Button } from "@/components/ui/button"
import Link from "next/link"

const MarketPlace = () => {
    return (
        <div className="w-full h-full">
                 <div className="flex flex-row justify-between border-b-2 py-2">
            <h5 className="text-2xl">All Resources</h5>
            <Button className='w-1/6 py-0 px-0'>
                <Link href={'/dashboard/marketplace/create'} className='flex items-center justify-center hover:-translate-y-2 transition-all w-full h-full'>Create</Link>
            </Button>
        </div>
            <div className="flex flex-wrap">

            </div>
        </div>
    )
}

export default MarketPlace