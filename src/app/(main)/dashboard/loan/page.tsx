"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import DataTable from "@/components/DataTable";
import { loanColumn } from "@/lib/columns";
import { useEffect, useState } from "react";
import { getAllLoan } from "@/lib/actions";

const SMELoan = () => {
    const [loans, setAllLoans] = useState([])

    useEffect(() => {
        const helper = async() => {
            const res:any = await getAllLoan()
            setAllLoans(res)
        }
        helper()
    }, [])

    return (
        <div className="flex flex-col space-y-6 w-full h-full">
        <div className="flex flex-row justify-between border-b-2 py-2">
            <h5 className="text-2xl">Apply Loan</h5>
            <Button className='w-1/6 py-0 px-0'>
                <Link href={'/dashboard/loan/create'} className='flex items-center justify-center hover:-translate-y-2 transition-all w-full h-full'>Create</Link>
            </Button>
        </div>
        <h1 className="text-3xl font-bold">All Loans</h1>
        <DataTable columns={loanColumn} data={JSON.stringify(loans)}/>
    </div>
    )
}

export default SMELoan