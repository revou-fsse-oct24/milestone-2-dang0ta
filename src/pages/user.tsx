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
import PageLayout from "@/components/pages/page-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { defaultUser, getInitial, User, userSchema } from "@/models/user";
import { GetServerSideProps } from "next";
import { getUserURL } from "@/actions/api";
import { parseError } from "@/actions/exceptions";
import Head from "next/head";

type Props = {
    user: User;
    error?: string;
};

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


export default function ProfileForm({ user, error }: Props) {

    const form = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: user,
        mode: "onChange",
    });


    function onSubmit(data: User) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });
    }

    if (error) {
        return (<PageLayout>
            <div>Error: {error}</div>
        </PageLayout>);
    }

    return (
        <>
            <Head>
                <title>{user.name} | ShopMart</title>
            </Head>
            <PageLayout>
                <div className="flex flex-col gap-8 w-screen-lg mx-auto p-8">
                    <div className="space-y-6">
                        <div className="flex flex-row gap-4">
                            <Avatar>
                                <AvatarImage src={user.avatar} alt={user.name} sizes="" />
                                <AvatarFallback>{getInitial(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-medium">{user.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {user.role} {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="john doe" {...field} />
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
                                            <Input type="email" placeholder="johndoe@shopmart.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Update profile</Button>
                        </form>
                    </Form>
                </div>
            </PageLayout>
        </>
    );
}