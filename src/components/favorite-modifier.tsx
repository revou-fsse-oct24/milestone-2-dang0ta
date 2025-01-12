'use client';
import { useFavorite } from "@/contexts/favorite-context";
import { Product } from "@/models/product";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";

export const FavoriteModifier = ({ product }: { product: Product; }) => {
    const { isFavorite, add, remove } = useFavorite();

    const isFav = isFavorite(product.id);

    if (isFav) {
        return (
            <Button variant="outline" size="icon" onClick={() => remove(product.id)}>
                <StarIcon style={{fill: "gold", color: "peru"}}  size={16} />
            </Button>
        );
    }

    return (
        <Button variant="outline" size="icon" onClick={() => add(product)}>
            <StarIcon className="text-gray-500" size={16} />
        </Button>
    );
};