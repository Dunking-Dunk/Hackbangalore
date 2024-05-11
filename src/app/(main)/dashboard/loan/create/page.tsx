import LoanForm from "@/components/LoanForm"

const CreateLoan =async() => {

    return (
        <div className="w-2/3 h-full">
            <h3 className="text-2xl font-bold mb-6">Loan Details</h3>
            <LoanForm />
        </div>
    )
}

export default CreateLoan