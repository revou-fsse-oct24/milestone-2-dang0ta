"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultUser, getInitial, User, userSchema } from "@/models/user";
import { GetServerSideProps } from "next";
import { getUserByIDURL, getUserURL } from "@/actions/api";
import { parseError } from "@/actions/exceptions";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from 'nextjs-toploader/app';
import { Loader2Icon } from "lucide-react";

export type Props = {
    user: User;
    error?: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = (async (context) => {
    try {
        const token = context.req.cookies.auth_token;
        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const r = await fetch(getUserURL(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!r.ok) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        const data = (await r.json()) as User;
        return { props: { user: data } };
    } catch (e) {
        const parsedErr = parseError(e);
        return { props: { user: defaultUser(), error: parsedErr.message } };
    }
}) satisfies GetServerSideProps<Props>;

type State = {
    loading: boolean;
    error?: string;
};

export default function UserPage({ user, error }: Props) {
    const [state, setState] = useState<State>({ loading: false });
    const router = useRouter();

    const form = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: user,
    });

    async function onSubmit(data: User) {
        setState({ loading: true });
        try {
            const res = await fetch(getUserByIDURL(user.id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    name: data.name,
                }),
            });
            if (!res.ok) {
                throw new Error(`Failed to update user, the server responded with status: ${res.statusText}`);
            }

            if (res.redirected) {
                router.replace(res.url);
                return;
            }

            setState({ loading: false });
            toast({
                title: "The user information has been updated!",
            });
            router.refresh();
        } catch (err) {
            const parsedErr = parseError(err);
            setState({ loading: false, error: parsedErr.message });
        }
    }

    if (error) {
        return (
                <div className="text-red-500">Error: {error}</div>
        );
    }

    return (
        <>
            <Head>
                <title>{user.name} | ShopMart</title>
            </Head>
                <div className="flex flex-col gap-8 w-screen-lg mx-auto p-8">
                    <div className="space-y-6">
                        <div className="flex flex-row gap-4 items-center" data-testid="user-avatar">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} sizes="" />
                                <AvatarFallback>{getInitial(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 data-testid="user-name" className="text-lg font-medium">{user.name}</h3>
                                <p data-testid="user-role-email" className="text-sm text-muted-foreground">
                                    {user.role} {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" data-testid="user-form">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input data-testid="username-input" placeholder="john doe" {...field} disabled={state.loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input  data-testid="email-input" type="email" placeholder="johndoe@shopmart.com" {...field} disabled={state.loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {state.loading
                                ? <Button type="submit" disabled>Updating user profile... <Loader2Icon className="w-4 h-4 animate-spin" /></Button>
                                : <Button type="submit">Update profile</Button>
                            }
                        </form>
                    </Form>
                    {state.error && <p className="text-red-500">{state.error}</p>}
                </div>
        </>
    );
}