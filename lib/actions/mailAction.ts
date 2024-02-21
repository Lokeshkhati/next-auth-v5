import { url } from "@/app/auth";

export async function mailAction({ email }: any) {

    // post api call here
    try {
        const res = await fetch(`${url}/reset-password`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            return null;
        }

    } catch (error) {

    }
}