import AuthForm from "@/components/AuthForm"

const SignIn = () => {
    return (
        <section className="flex w-full h-full px-32 max-sm:px-6">
            <AuthForm type="sign-in" />
        </section>
    )
}

export default SignIn