import { useQueryParams } from "@hooks/useQuery";

const Products = () => {
    const query = useQueryParams();
    const category = query.get("category") || "no category";

  return (
    <div>Products {category}</div>
  )
}

export default Products