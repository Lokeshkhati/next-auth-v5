'use client'
import { url } from "@/app/auth";
import Link from "next/link";
import { useState } from "react";
import axios from 'axios';

const ChangePasswordForm = ({ token }: { token: string }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [hasUpdated, setHasUpdated] = useState(false)


    const payload = {
        reset_token: token,
        new_password: password,
        confirm_password: password,
    }
    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const handleResetPassword = async (event: any) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        try {
            const response = await axios.post(`${url}/reset-password`, payload, options);

            console.log('Response:', response.data);
            if (response.status === 200) {
                setHasUpdated(true);
            } else {
                throw new Error('Failed to reset password');
            }
        } catch (error: any) {
            console.error('An error occurred:', error?.message);

        }
    };



    if (hasUpdated) return <SuccessTemplate />

    return (
        <div
            className="flex justify-center items-center h-screen
            bg-gray-200 text-gray-800 "
        >
            <form
                onSubmit={handleResetPassword}
                className="flex flex-col p-4  items-center w-96 rounded shadow-md   text-gray-800 "
            >
                <div className="w-full mt-2.5  ">
                    <label className="px-1">New Password</label>
                    <input
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        placeholder="********"
                        className="w-full  ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm py-2 px-3 h-9 mt-2 rounded border-0 bg-transparent outline-none text-gray-800 focus:ring-brand ring-orange-500"
                    />
                </div>
                <div className="w-full mt-2.5  ">
                    <label className="px-1">Confirm Password</label>
                    <input
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        type="password"
                        placeholder="********"
                        className="w-full  ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm py-2 px-3 h-9 mt-2 rounded border-0 bg-transparent outline-none text-gray-800 focus:ring-brand ring-orange-500"
                    />
                </div>

                <button type="submit"
                    className=" mt-4 cursor-pointer w-full px-4 py-2 font-medium text-center text-white bg-orange-500 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ">
                    Update Password
                </button>
            </form>
        </div>
    )
}
export default ChangePasswordForm


const SuccessTemplate = () => {
    return <div className="mx-auto max-w-xl flex gap-4 bg-green-300 px-4 py-2">
        <h1>You have successfully created new password</h1>
        <Link href='/login' className="underline">Login</Link>
    </div>
}