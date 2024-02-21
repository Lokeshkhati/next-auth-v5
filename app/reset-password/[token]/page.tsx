import ChangePasswordForm from "@/components/auth/ChangePasswordForm"

const ResetPasswordToken = ({ params }: { params: { token: string } }) => {

    return (
        <ChangePasswordForm token={params?.token} />
    )
}
export default ResetPasswordToken
