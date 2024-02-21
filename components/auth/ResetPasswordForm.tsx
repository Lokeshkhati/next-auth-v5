'use client'
import { url } from "@/app/auth";
import { useState } from "react";
import axios from 'axios';
import Spinner from "../ui/Spinner";

function ResetPasswordForm() {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)
    const [sendingEmail, setSendingEmail] = useState(false)

    const payload = { email }

    const options = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const handleForgotPassword = async (event: any) => {
        event.preventDefault();
        if (!email) {
            throw new Error("Please Enter email first!")
        }

        try {
            setSendingEmail(true)
            const response = await axios.post(`${url}/forgot-password`, payload, options);

            console.log(response, 'this is response');

            if (response.status === 200) {
                setEmailSent(true);
                console.log('Password reset email sent successfully');
            } else {
                console.error('Error sending password reset email');
            }
        } catch (error) {
            setSendingEmail(false)
            console.log('M hu ek Error')
            console.error('An error occurred:', error);
        }
    };



    if (emailSent) {
        return <EmailSentUI />
    }
    return (
        <div className="max-w-4xl mx-auto mt-24">
            <div className="flex flex-col items-center justify-center  p-4 space-y-4 antialiased text-gray-900 ">
                <div className=" shadow-md border border-gray-300 w-full px-8 max-w-lg space-y-6 bg-white rounded py-16">
                    <h1 className=" mb-6 text-3xl font-bold text-center">
                        Reset your password
                    </h1>
                    <p className="text-center mx-12">To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.
                    </p>
                    <form onSubmit={handleForgotPassword} className="space-y-6 w-ful">
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-primary-100"
                            type="email" name="email" placeholder="Email address" />
                        <div>
                            <button type="submit"
                                disabled={sendingEmail}
                                className="cursor-pointer w-full px-4 py-2 font-medium text-center text-white bg-orange-500 transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ">
                                {/* {sendingEmail ? <Spinner /> : 'Send'} */}
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default ResetPasswordForm



const EmailSentUI = () => {
    return <div>Please check your registered email.</div>
}