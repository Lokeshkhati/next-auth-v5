"use client"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };
    return (
        <button className=" mt-4 rounded border border-gray-800 px-4 py-1 text-xl" onClick={handleSignOut}>Logout </button>
    )
}
export default LogoutButton
