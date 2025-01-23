import { loginURL } from "@/actions/api";
import { parseError } from "@/actions/exceptions";
import { LoginForm } from "@/components/pages/authentication/login-form";
import { credential, Credential, LoginResponse } from "@/models/login-credential";
import * as cookie from "cookie";
import { useRouter } from 'next/router'


export default function LoginPage() {
    const router = useRouter()
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 w-full">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm login={async (user: Credential): Promise<string> => {
                    const parsed = credential.safeParse({
                        ...user,
                    });

                    if (!parsed.success || !parsed.data) {
                        return "invalid login credential";
                    }

                    try {
                        const res = await fetch(loginURL(), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: parsed.data.email,
                                password: parsed.data.password,
                            }),
                        });
    
                        if (!res.ok) {
                            switch (res.status) {
                                case 401:
                                    return "wrong email and/or password";
                                case 403:
                                    return "you're not allowed to do this!";
                            }
                            return "An error occurred while fetching the data";
                        }
    
                        const response = (await res.json()) as LoginResponse;
                        document.cookie = cookie.serialize('auth_token', response.access_token, {
                            httpOnly: true,
                            maxAge: 60 * 10,
                            secure: true,
                        });
                    } catch (e) {
                        const parsedErr = parseError(e);
                        return parsedErr.message;
                    }

                    router.push("/")
                    return ""
                }} />
            </div>
        </div>
    );
}
