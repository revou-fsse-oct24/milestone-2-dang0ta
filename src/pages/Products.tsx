import { CategoryList } from "@components/CategoryList";
import ProductsList from "@components/ProductsList";
const Products = () => {

  return (
    <div className="flex flex-row items-start">
      <CategoryList />
      <ProductsList className="flex-1" />
    </div>
  );
};

export default Products;
