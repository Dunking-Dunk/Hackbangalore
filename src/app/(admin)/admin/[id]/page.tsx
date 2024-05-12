// @ts-nocheck

import { currentUser, getLoan } from "@/lib/actions"
import Link from "next/link"
import CardOverview from "@/components/OverviewCard"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

const Page = async({ params: {id} }) => {
    const loan = await getLoan(id)
    const user = await currentUser(loan?.userId)

    return (
        <div className="w-full h-full p-6">
            <div className="p-4">
            <Link href='/admin' className="underline">Back</Link>
            </div>
            <Separator/>
            <h3 className="text-2xl m-4 font-semibold">User Detail</h3>
            <div className="flex flex-col space-y-2">
            <CardOverview title='UserName' description={"Person who bought loan"} value={user?.firstName} />
            <CardOverview title='User Email' description={"Person Email"} value={user?.email} />
            </div>
            <h3 className="text-2xl m-4 font-semibold">Loan Details</h3>
                    <div className="flex flex-col space-y-4 w-3/4">
                    <CardOverview title='Status' description={"Loan Status"} value={loan?.status} />
                        <CardOverview title='Pan Id' description={"User PAN ID"} value={loan?.pan} />
                        <CardOverview title='Bank Name' description={"Bank Name"} value={loan?.bankName} />
                        <CardOverview title='Account Number' description={"Account Number"} value={loan?.accountNumber} />
                        <CardOverview title='Loan Amount' description={"Total Loan Amount"} value={loan?.loanAmount} />
                        <div className="px-4 space-y-4">
                        <div className="flex flex-col space-y-2">
                                <h3 className="text-xl font-bold">Loan Reason</h3>
                                <p className="text-xl font-normal">{loan?.reason} </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                                <h3 className="text-xl font-bold">ITR</h3>
                                <a className="text-xl font-normal underline" href={loan?.ITR}>ITR </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                                <h3 className="text-xl font-bold">Balance Sheet</h3>
                                <a className="text-xl font-normal underline" href={loan?.balanceSheet}>Balancesheet</a>
                        </div>
                        <div className="flex flex-col space-y-2">
                                <h3 className="text-xl font-bold">bankStatement</h3>
                                <a className="text-xl font-normal underline" href={loan?.bankStatement}>Bank Statement </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                                <h3 className="text-xl font-bold">Udayam</h3>
                                <a className="text-xl font-normal underline" href={loan?.udayam}>Udayam Certificate </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                                <h3 className="text-xl font-bold">Quotation</h3>
                                <a className="text-xl font-normal underline" href={loan?.quotation}>Quotation </a>
                        </div>
                        <div className="flex flex-col space-y-2">
                                <h3 className="text-xl font-bold">Cash Flow</h3>
                                <a className="text-xl font-normal underline" href={loan?.cashFlow}>Cash Flow </a>
                        </div>
                        </div>
                        <p>Manual Option to approve and decline</p>
                        <div className="flex flex-row space-x-4 px-10">
                        <Button>Approve</Button>
                        <Button>Decline</Button>
                        </div>
                    
                    </div>
        </div>
    )
}

export default Page