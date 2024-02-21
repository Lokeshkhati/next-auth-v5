"use server"

import { signIn } from "@/app/auth"
import { AuthError } from "next-auth"

export async function loginAction(formData: any) {

    try {
        await signIn("credentials", {
            email: formData?.email,
            password: formData?.password,
            redirectTo: '/'
        })
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: 'Invalid credentials'
                    }
                default:
                    return {
                        error: 'Unknown error found'
                    }
            }
        }
        throw error
    }

}