import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { parseError } from "@/actions/exceptions";
import { Loader2Icon } from "lucide-react";
import {useRouter} from 'nextjs-toploader/app';

const newProduct = z.object({
    title: z.string(),
    price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      }),
    description: z.string().optional(),
});

type NewProduct = z.infer<typeof newProduct>;

type State = {
    loading: boolean;
    error?: string;
}

export default function NewProductDialog() {
    const router = useRouter();
    const [state, setState] = useState<State>({ loading: false });

    const form = useForm<NewProduct>({
        defaultValues: { title: 'A brand new product', price: "69", description: 'A new product description' },
        resolver: zodResolver(newProduct),
    });

    const onSubmit = async (data: NewProduct) => {
        setState({ loading: true });
        try {
            const res = await fetch(`https://api.escuelajs.co/api/v1/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "title": data.title,
                    "price": Number.parseInt(data.price),
                    "description": data.description,
                    "categoryId": 1,
                    "images": ["https://placeimg.com/640/480/any"]
                }),
            })

            if (!res.ok) {
                throw new Error('An error occurred');
            }

            setState({ loading: false });
            if (res.redirected) {
                router.push(res.url);
                return;
            }

            const {id} = await res.json();

            router.push("/shop/product/"+ id);
        } catch(e) {
            const parsedErr = parseError(e);
            setState({ loading: false, error: parsedErr.message });
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Submit a product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Submit a new product</DialogTitle>
                            <DialogDescription>
                                Register a new product to Platzi Fake API.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-2 my-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Product Name
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="A brand new product" disabled={state.loading} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Price
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="USD 69" type="number" disabled={state.loading} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="A really cool product" disabled={state.loading} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        )} />
                        </div>
                        <DialogFooter>
                            {state.loading 
                            ? <Button disabled type="submit">Submitting Product... <Loader2Icon className="w-4 h-4 animate-spin" /></Button>
                        : <Button type="submit">Submit Product</Button>}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
