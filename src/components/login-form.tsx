'use client';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useActionState } from "react";
import { loginAction } from "@/actions/auth";
import { Loader2Icon } from "lucide-react";
import { Label } from "./ui/label";


export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [error, action, loading] = useActionState(loginAction, "");

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" action={action}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-balance text-muted-foreground">
                                    Login to your ShopMart account
                                </p>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        name="email"
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" name="password" required />
                                </div>
                                {loading ? <Button disabled type="submit" className="w-full">
                                    <Loader2Icon size={16} className="animate-spin" />
                                    Logging in...
                                </Button> : <Button type="submit" className="w-full">
                                    Login
                                </Button>}
                            </div>
                            {error ? <p className="text-sm font-semibold text-destructive">{error}</p> : <p>&nbsp;</p>}
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </form>
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
