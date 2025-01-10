import { Button } from "@components/button";
import { Input } from "@components/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@components/form";
import { cn } from "@/utils/cn";
import { HTMLAttributes, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "@/actions/auth";
import { parseError } from "@/actions/exceptions";

const credential = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type Credential = z.infer<typeof credential>;

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useForm<Credential>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(credential),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(credential: Credential) {

    setIsLoading(true);
    try {
        const {status, data, error} = await login(credential);
        if (status == "error" ) {
            console.warn({error})
        }


        // TODO: do something on sign in
        console.log({data})
        setIsLoading(false);
    } catch (e) {
        const parsedError = parseError(e)
        console.warn(parsedError)
        setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Password</FormLabel> */}
                <FormControl>
                  <Input placeholder="your very secure password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            {/* <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div> */}
            {/* <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="yourverysecurepassword"
                type="password"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
              />
            </div> */}
            <Button disabled={isLoading}>
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
