import { getProduct } from "@/actions/products";
import { CartModifier } from "@/components/CartModifier";
import {getMainImage } from "@/models/product";
import Image from "next/image";
import Link from "next/link";

const ProductPage = async ({
  params: { id },
}: {
  params: { id: string };
  searchParms?: Record<string, string>;
}) => {
  const {status, data,error} = await getProduct({ id })

  if (status == "error") {
    return <>error {error}</>;
  }

  return (
    <div>
      <Image alt={data.title} width={400} height={400} className="h-[400px] w-[400px] object-cover aspect-[3/4]"src={getMainImage(data)} />
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p>{data.description}</p>
      <p>Price: {data.price}</p>
      <div className="flex flex-col gap-2">
        <Image alt={data.category.name} src={data.category.image} width={64} height={64} />
        <Link href={`/products?category=${data.category.id}`}>
          <span className="font-semibold text-lg">{data.category.name}</span>
        </Link>
      </div>

      <CartModifier product={data} />
    </div>
  );
};

export default ProductPage;
