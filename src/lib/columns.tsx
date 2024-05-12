"use client"

import Link from "next/link";

export const loanColumn = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "bankName",
      header: "Bank Name",
    },
    {
      accessorKey: "loanAmount",
      header: "Loan Amount",
    },
    {
      accessorKey: "status",
      header: "Loan Status",
    },
    // {
    //   accessorKey: "action",
    //   header: "Action",
    //   cell: ({ row }:any) => {
    //     const id = row.getValue("id");
  
    //     return (
    //       <div className="flex space-x-4 items-center">
    //         <Link
    //           href={`/loan/${id}`}
    //           className="bg-secondary  h-full py-2 px-4 rounded-lg"
    //         >
    //           View
    //         </Link>
    //       </div>
    //     );
    //   },
    // },
  ];

  export const transactionColumn = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "note",
      header: "Note",
    },
    {
      accessorKey: "status",
      header: "Transaction Status",
    },
    {
      accessorKey: "totalAmount",
      header: "Total Amount",
    },
    {
      accessorKey: "transactionId",
      header: "Transaction Id",
    }
  ];

  export const balanceSheetColumn = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorkey: "assets.value",
      header: 'Assets Value'
    },
    {
      accessorkey: 'date',
      header: 'Date'
    },
    {
      accessorkey: 'equity.value',
      header: 'Equity Value'
    },
    {
      accessorkey: 'liabilities.value',
      header: 'Liability'
    },
    {
      accessorkey: 'netAssets',
      header: 'Net Assets'
    },
  ]

 export const adminLoanColumn = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "bankName",
    header: "Bank Name",
  },
  {
    accessorKey: "loanAmount",
    header: "Loan Amount",
  },
  {
    accessorKey: "status",
    header: "Loan Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }:any) => {
      const id = row.getValue("id");

      return (
        <div className="flex space-x-4 items-center">
          <Link
            href={`/admin/${id}`}
            className="bg-secondary  h-full py-2 px-4 rounded-lg"
          >
            View
          </Link>
        </div>
      );
    },
  },
]