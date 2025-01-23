import { parseError } from "@/actions/exceptions";
import { LoginForm } from "@/components/pages/authentication/login-form";
import {  Credential } from "@/models/login-credential";
import { useRouter } from "next/router";


export default function LoginPage() {
    const router = useRouter();
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 w-full">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm login={async (user: Credential): Promise<string> => {
                    try {
                        const res = await fetch('/api/login', {
                            method: 'POST',
                            body: JSON.stringify(user),
                            redirect: 'follow',
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })

                        if (!res.ok) {
                            return res.statusText
                        }

                        // handle redirect response manually,
                        // since we're using fetch.
                        if (res.redirected) {
                            router.replace(res.url);
                        }
                        
                        return ""
                    } catch(e) {
                        const parsedErr = parseError(e);
                        return parsedErr.message
                    }
                }} />
            </div>
        </div>
    );
}
