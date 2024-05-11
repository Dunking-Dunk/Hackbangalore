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