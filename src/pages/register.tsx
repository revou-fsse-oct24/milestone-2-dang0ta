import { parseError } from "@/actions/exceptions";
import { RegisterForm } from "@/components/pages/authentication/register-form";
import { userInformation, UserInformation } from "@/models/user-information";
import Head from "next/head";
import { useRouter } from 'nextjs-toploader/app';
import { ReactElement, ReactNode } from "react";

function RegisterPage() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>Register a new user | ShopMart</title>
            </Head>
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
                            const res = await fetch('/api/register', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(parsed.data),
                                redirect: 'follow'
                            });

                            if (!res.ok) {
                                return `failed to create user, the server responded with status:${res.statusText}`;
                            }

                            if (res.redirected) {
                                router.replace(res.url);
                            }
                        } catch (e) {
                            const parsedErr = parseError(e);
                            return parsedErr.message;
                        }

                        return "";
                    }} />
                </div>
            </div>
        </>
    );
}



RegisterPage.getLayout = (page:ReactElement): ReactNode => <>{page}</>

export default RegisterPage;