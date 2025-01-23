import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import { type Credential, credential } from "@/models/login-credential";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";

type State = {
    loading: boolean;
    error?: string;
};

export function LoginForm({
    className,
    login,
    ...props
}: React.ComponentProps<"div"> & { login: (credential: Credential) => Promise<string | never>; }) {
    const [state, setState] = useState<State>({ loading: false });
    const form = useForm<Credential>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(credential),
    });


    const handleSubmit = async (credential: Credential) => {
        setState({ loading: true });
        const message = await login(credential);
        if (message) {
            setState({ loading: false, error: message });
            return;
        }

        setState({ loading: false });
    };


    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <Form {...form} >
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-balance text-muted-foreground">
                                        Login to your ShopMart account
                                    </p>
                                </div>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="johndoe@shopmart.com" />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="your very secure password" type="password" />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {state.loading ? <Button disabled type="submit" className="w-full">
                                    <Loader2Icon size={16} className="animate-spin" />
                                    Logging in...
                                </Button> : <Button type="submit" className="w-full">
                                    Login
                                </Button>}

                                {state.error ? <p className="text-sm font-semibold text-destructive">{state.error}</p> : <p>&nbsp;</p>}
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <a href="/register" className="underline underline-offset-4">
                                        Sign up
                                    </a>
                                </div>
                            </div>
                        </form>
                    </Form>
                    <div className="relative hidden bg-muted md:block">
                        <Image
                            width={400}
                            height={400}
                            src="/images/login_bg.webp"
                            alt="Open Shop"
                            className="absolute h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary flex flex-col items-center gap-2">
                <p>By clicking login, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.</p>
                <p>Open shop image by <a href="https://unsplash.com/@mikepetrucci">Mike Petrucci</a> from <a href="https://unsplash.com/photos/gray-and-blue-open-signage-c9FQyqIECds">Unsplash.</a></p>
            </div>
        </div>
    );
}
