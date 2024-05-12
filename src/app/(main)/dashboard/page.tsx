// @ts-nocheck

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { currentUser } from '@/lib/actions'
import { CodatLending } from "@codat/lending";
import DataTable from '@/components/DataTable';
import { balanceSheetColumn, transactionColumn } from '@/lib/columns';


export default async function HomePage() {
    const session = await getServerSession(authOptions)
    const user = await currentUser(session?.user?.id)

    const sdk = new CodatLending({
        security: {
            authHeader: 'Basic bmpaVXp1VHZKVGFkV0NxYnd5MDhOMUd3Y3JVd3NudmExeU1sUjJiUg==',
        },
    })

      const balanceSheet = await sdk.financialStatements.balanceSheet.get({
        companyId: user?.company?.companyConnect,
        periodLength: 2,
        periodsToCompare: 10,
        startMonth: "2023-10-23T00:00:00Z",
      });
      const bankTransaction = await sdk.transactions.accountTransactions.list({
        companyId: user?.company?.companyConnect,
        connectionId: "31fa0c58-5773-4bef-8c24-3576f879b3c6",
        orderBy: "-modifiedDate",
        page: 1,
        pageSize: 10,
      });
      console.log(balanceSheet.accountingBalanceSheet?.reports[0])
        return (
            <main className='w-full h-full'>
                <h3 className='text-2xl font-semibold mb-4'>All Transactions</h3>
                <DataTable data={JSON.stringify(bankTransaction.accountingAccountTransactions?.results)} columns={transactionColumn}/>
                <h3 className='text-2xl font-semibold mb-4'>Balance Sheet</h3>
                <DataTable data={JSON.stringify(balanceSheet.accountingBalanceSheet?.reports)} columns={balanceSheetColumn}/>
            </main>
        )
    
}