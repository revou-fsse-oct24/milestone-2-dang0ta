import { createUserURL } from "@/actions/api";
import { parseError } from "@/actions/exceptions";
import { RegisterForm } from "@/components/pages/authentication/register-form";
import { userInformation, UserInformation } from "@/models/user-information";
import { useRouter } from 'next/router';

export default function RegisterPage() {
    const router = useRouter();
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10 w-full">
            <div className="w-full max-w-sm md:max-w-3xl">
                <RegisterForm action={async (info: UserInformation): Promise<string> => {
                    const parsed = userInformation.safeParse({
                        ...info,
                    });

                    if (!parsed.success || !parsed.data) {
                        return "invalid user information";
                    }

                    try {
                        const res = await fetch(createUserURL(), {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(parsed.data),
                        });

                        if (!res.ok) {
                            return `failed to create user, the server responded with status:${res.statusText}`;
                        }
                    } catch (e) {
                        const parsedErr = parseError(e);
                        return parsedErr.message;
                    }

                    router.push("/login");
                    return "";

                }} />
            </div>
        </div>
    );
}
