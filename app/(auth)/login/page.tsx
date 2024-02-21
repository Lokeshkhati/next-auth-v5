import { auth } from "@/app/auth"
import LoginForm from "@/components/auth/LoginForm"

const LoginPage = async () => {
    const session = await auth()


    if (!session) {
        return <LoginForm />
    }

}
export default LoginPage