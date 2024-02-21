"use client"
import { loginAction } from "@/lib/actions/loginAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../Logo";
import Spinner from "../ui/Spinner";

const LoginForm = () => {
    const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm();
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            setErrorMessage('');
            const response = await loginAction(data);
            if (response?.error) {
                setErrorMessage(response.error);
            } else {
                router.push('/');
            }
        } catch (error) {
            setErrorMessage("An error occurred during login.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200 text-gray-800">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col p-4 items-center w-96 rounded shadow-md text-gray-800"
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex justify-center">
                        <Logo />
                    </div>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-800">
                        LogIn to your account
                    </h2>
                </div>
                {errorMessage && (
                    <h3 className="bg-rose-600 mt-4 text-gray-200 text-2xl px-4">{errorMessage}</h3>
                )}
                <div className="w-full mt-2.5">
                    <label className="px-1">Email</label>
                    <input
                        {...register('email', { required: true })}
                        placeholder="abc123@mail.com"
                        type="email"
                        className="w-full ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm py-2 px-3 h-9 mt-2 rounded border-0 bg-transparent outline-none text-gray-800 focus:ring-brand ring-orange-500"
                    />
                </div>
                <div className="w-full mt-2.5">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-800">
                            Password
                        </label>
                        <div className="text-sm">
                            <Link href="/reset-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <input
                        {...register('password', { required: true })}
                        placeholder="*********"
                        type="password"
                        className="w-full ring-1 ring-inset focus:ring-2 focus:ring-inset text-sm py-2 px-3 mt-2 h-9 rounded border-0 bg-transparent outline-none text-gray-800 focus:ring-brand ring-orange-500"
                    />
                </div>
                <div className="w-full mt-2">
                    <button
                        type="submit"
                        className="text-center w-full text-md mx-auto bg-orange-500 text-white rounded-sm py-2 m-3 hover:bg-orange-600"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : 'Log In'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
