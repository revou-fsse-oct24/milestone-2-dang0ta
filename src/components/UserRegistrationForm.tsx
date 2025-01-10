import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
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

type UserRegistrationFormProps = HTMLAttributes<HTMLDivElement>;

export function UserRegistrationForm({ className, ...props }: UserRegistrationFormProps) {
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
          
          <div className="grid gap-2">            
            <Button disabled={isLoading}>
              {isLoading && (
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
