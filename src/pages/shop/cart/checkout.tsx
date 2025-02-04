import PageLayout from "@/components/pages/page-layout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/cart-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const checkoutInformation = z.object({
    shipping: z.object({
        firstName: z.string(),
        lastName: z.string().optional(),
        phone: z.string(),
        phonePrefix: z.number(),
        address: z.string(),
        addressExtra: z.string().optional(),
        city: z.string(),
        state: z.string(),
        zipcode: z.number(),
        country: z.string(),
    })
})

type CheckoutInformation = z.infer<typeof checkoutInformation>;

const defaultCheckoutInforamtion = (): CheckoutInformation => {
    return {
        shipping: {
            // TODO: pull this out from the current authenticated user
            firstName: "",
            lastName: "",
            phone: "12345678",
            phonePrefix: 62,
            address: "",
            addressExtra: "",
            city: "",
            state: "",
            zipcode: 0,
            country: "Indonesia",
        }
    }
}

export default function CheckoutPage() {
    const cart = useCart();

    const form = useForm<CheckoutInformation>({
        defaultValues: defaultCheckoutInforamtion(),
        resolver: zodResolver(checkoutInformation),
    });

    const onSubmit = (data: CheckoutInformation) => {
        console.log({data})
    }

    // TODO: add layout.
    return (
        <PageLayout>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <ShippingSection />
                    <PaymentSection />
                    <Button type="submit">Pay</Button>
                </form>
            </Form>
        </PageLayout>
    )
}

function ShippingSection() {
    const form = useFormContext()
    return (
        <>
        <h3>Shipping</h3>
        <FormField
          control={form.control}
          name="shipping.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </>
    )
}

function PaymentSection() {
    const form = useFormContext()
    return (
        <>
        <h3>Payment</h3>
        </>
    )
}