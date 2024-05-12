import DataTable from "@/components/DataTable"
import { getEveryLoan } from "@/lib/actions"
import { adminLoanColumn } from "@/lib/columns"

const Page = async() => {
    const loans = await getEveryLoan()
   
    return (
        <div className="h-full w-full">
            <h3 className="text-2xl font-bold mb-8">All Loans</h3>
            <DataTable data={JSON.stringify(loans)} columns={adminLoanColumn} />
        </div>
    )
}

export default Page