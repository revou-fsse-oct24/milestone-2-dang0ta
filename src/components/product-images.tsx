'use client';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const ProductImages = ({ images, className }: { readonly images: string[]; className?: string; }) => {
    return (
        <Carousel className={cn(className, "w-full max-w-xs flex flex-col")}>
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={image}>
                        <Image src={image} width={400} height={400} alt="" className="rounded-md" />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="my-2 flex flex-row gap-2">
                <CarouselPrevious className="relative rounded-none left-0 translate-y-0" />
                <CarouselNext className="relative rounded-none right-0 translate-y-0" />
            </div>
        </Carousel>
    );
};
