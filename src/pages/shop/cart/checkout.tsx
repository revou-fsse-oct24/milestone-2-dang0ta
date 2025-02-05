import PageLayout from "@/components/pages/page-layout";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CartItem, useCart } from "@/contexts/cart-context";
import { getMainImage } from "@/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm, useFormContext } from "react-hook-form";
import { z } from "zod";

const checkoutInformation = z.object({
    shipping: z.object({
        firstName: z.string(),
        lastName: z.string().optional(),
        phone: z.string(),
        phonePrefix: z.string(),
        address: z.string(),
        addressExtra: z.string().optional(),
        city: z.string(),
        state: z.string(),
        zipcode: z.number(),
        country: z.string(),
    }),
    paymentMethod: z.string(),
});

type CheckoutInformation = z.infer<typeof checkoutInformation>;

const defaultCheckoutInforamtion = (): CheckoutInformation => {
    return {
        shipping: {
            // TODO: pull this out from the current authenticated user
            firstName: "",
            lastName: "",
            phone: "12345678",
            phonePrefix: "+62",
            address: "",
            addressExtra: "",
            city: "",
            state: "",
            zipcode: 0,
            country: "Indonesia",
        },
        paymentMethod: "creditcard"
    };
};

export default function CheckoutPage() {


    const form = useForm<CheckoutInformation>({
        defaultValues: defaultCheckoutInforamtion(),
        resolver: zodResolver(checkoutInformation),
    });

    const onSubmit = (data: CheckoutInformation) => {
        console.log({ data });
    };

    // TODO: add layout.
    return (
        <PageLayout>
            <div className="flex flex-row justify-center">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-4 max-w-screen-xl">
                        <div className="flex flex-col gap-4 flex-1">
                            <CartSummarySection />
                            <ShippingSection />
                        </div>

                        <PaymentSection />
                    </form>
                </Form>
            </div>
        </PageLayout>
    );
}

function ShippingSection() {
    const form = useFormContext();
    return (
        <div className="p-2 flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Shipping</h3>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                    <FormField
                        control={form.control}
                        name="shipping.firstName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shipping.lastName"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-row gap-2">
                    <FormField
                        control={form.control}
                        name="shipping.phonePrefix"
                        render={({ field }) => (
                            <FormItem>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="select your phone's country code" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="+62">+62</SelectItem>
                                        <SelectItem value="+1">+1</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shipping.phoneNumber"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="812312321" type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="shipping.address"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="shipping.addressExtra"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Apartment number, suite, etc."  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-row gap-2">
                    <FormField
                        control={form.control}
                        name="shipping.city"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="City"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shipping.state"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="State"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shipping.zipcode"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="ZIP code"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="shipping.country"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Country"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <p className="text-sm text-muted-foreground">Estimated delivery by March 24th, 2025</p>

            <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <h3 className="font-semibold text-lg">Payment Method</h3>
                        <FormControl>
                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                            >
                                <FormItem className="flex items-center space-x-3 space-y-0 border p-2 rounded-md ">
                                    <FormLabel className="font-normal flex-1 flex justify-between cursor-pointer">
                                        <div className="flex flex-col justify-between">
                                            <h4 className="font-medium leading-4">Credit Card</h4>
                                            <p className="text-sm text-muted-foreground">Secure and encrypted by SecureGate</p>
                                        </div>
                                        <div>
                                            <Image src="/images/visa.svg" width={40} height={40} alt="visa icon" />
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroupItem value="creditcard" />
                                    </FormControl>
                                </FormItem>

                                <FormItem className="flex items-center space-x-3 space-y-0 border p-2 rounded-md">
                                    <FormLabel className="font-normal flex-1 flex justify-between cursor-pointer">
                                        <div className="flex flex-col justify-between">
                                            <h4 className="font-medium leading-4">PayPal</h4>
                                            <p className="text-sm text-muted-foreground">Easy payment</p>
                                        </div>
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroupItem value="paypal" />
                                    </FormControl>
                                </FormItem>
                                
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

function PaymentSection() {

    const { allItems } = useCart();

    const items = allItems();
    const count = items.length;
    const subtotal = items.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
    const tax = Math.floor(subtotal * 0.1);
    const shipping = 1;
    const total = subtotal + tax + shipping;
    const formatter = Intl.NumberFormat();

    return (
        <div className="p-4 border rounded-md flex flex-col gap-4 justify-between">
            <div className="flex flex-col gap-4">
                <h3 className="font-semibold text-lg leading-8">Payment</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                        <span className="min-w-64">Subtotal ({count})</span>
                        <span className="font-semibold">USD {formatter.format(subtotal)}.00</span>
                    </div>

                    <div className="flex flex-row justify-between">
                        <span className="min-w-64">Est. Delivery</span>
                        <span className="font-semibold">USD {shipping}.00</span>
                    </div>

                    <div className="flex flex-row justify-between">
                        <span className="min-w-64">Est. Tax</span>
                        <span className="font-semibold">USD {formatter.format(tax)}.00</span>
                    </div>

                    <Separator />

                    <div className="flex flex-row justify-between">
                        <span className="min-w-64">Est. Total</span>
                        <span className="font-semibold">USD {formatter.format(total)}.00</span>
                    </div>
                </div>
            </div>
            <Button size="lg" className="text-lg font-semibold">Pay USD {formatter.format(total)}.00</Button>
        </div>
    );
}

function CartSummarySection() {
    const { allItems } = useCart();

    return (
        <div className="p-2">
            <h3 className="font-semibold text-lg">Cart Summary</h3>
            <div className="flex flex-col gap-2">
                {allItems().map((item) => (
                    <CartSummaryItem key={item.product.id} item={item} />
                ))}
            </div>

        </div>
    );
}

function CartSummaryItem({ item }: { item: CartItem; }) {
    const formatter = Intl.NumberFormat();
    return (
        <div className="flex flex-row gap-4 p-2">
            <Image src={getMainImage(item.product)} alt={item.product.title} width={64} height={64} />
            <div className="flex flex-1 flex-row justify-between">
                <div className="flex flex-col gap-2">
                    <h4>{item.product.title}</h4>
                    <p className="text-muted-foreground text-sm">USD {formatter.format(item.product.price)}.00 x {item.quantity}</p>
                </div>

                <p className="font-bold text-lg">USD {formatter.format(item.product.price * item.quantity)}.00</p>
            </div>
        </div>
    );
}