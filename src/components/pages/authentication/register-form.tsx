'use client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { defaultUserInformation, userInformation, type UserInformation } from "@/models/user-information";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type State = {
    loading: boolean;
    error?: string;
};

export function RegisterForm({
    className,
    action,
    ...props
}: React.ComponentProps<"div"> & { action: (user: UserInformation) => Promise<string>; }) {
    const [state, setState] = useState<State>({ loading: false });
    const form = useForm<UserInformation>({
        defaultValues: defaultUserInformation(),
        resolver: zodResolver(userInformation),
    });

    const handleSubmit = async (user: UserInformation) => {
        setState({ loading: true });
        const message = await action(user);
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
                    <Form {...form}>
                        <form className="p-6 md:p-8" onSubmit={form.handleSubmit(handleSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">Welcome back</h1>
                                    <p className="text-balance text-muted-foreground">
                                        Create your ShopMart account
                                    </p>
                                </div>
                                <div className="flex flex-col gap-6">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>User name</FormLabel>
                                            <FormControl>
                                                <Input data-testid="user-name-input" {...field} placeholder="John Doe" />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage data-testid="user-name-input-message" />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input  data-testid="email-input" {...field} placeholder="johndoe@shopmart.com" />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage data-testid="email-input-message" />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input  data-testid="password-input" {...field} placeholder="your very secure password" type="password" />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage data-testid="password-input-message" />
                                        </FormItem>
                                    )} />
                                    {state.loading ? <Button data-testid="submit-button" disabled type="submit" className="w-full">
                                        <Loader2Icon size={16} className="animate-spin" />
                                        Creating user...
                                    </Button> : <Button  data-testid="submit-button" type="submit" className="w-full">
                                        Create user
                                    </Button>}
                                </div>

                                <p data-testid="error-message" className="text-sm font-semibold text-destructive">{state.error || ""}</p>
                                <div className="text-center text-sm">
                                    already have an account?{" "}
                                    <a href="/login" className="underline underline-offset-4">
                                        Sign in
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
                <p>By clicking register, you agree to our <a href="#">Terms of Service</a>{" "}
                    and <a href="#">Privacy Policy</a>.</p>
                <p>Open shop image by <a href="https://unsplash.com/@mikepetrucci">Mike Petrucci</a> from <a href="https://unsplash.com/photos/gray-and-blue-open-signage-c9FQyqIECds">Unsplash.</a></p>
            </div>
        </div>
    );
}
