import { getCategories } from "@actions/categories";
import { CategoryList } from "@components/CategoryList";
import { useQueryParams } from "@hooks/useQuery";
import { useResponse } from "@hooks/useResponse";
import { Category } from "@models/category";
import { Navigate } from "react-router-dom";

const Products = () => {
    const query = useQueryParams();
    const category = query.get("category") || "-1";

    const {state, response}= useResponse<Category[]>(getCategories)

    if (state === "loading" || state === "init") {
        return <>loading categories...</>
    }

    if (!response) {
        return <Navigate to="/" />
    }

    if (response.status === "error") {
        return <>Error: {response.error}</>
    }


  return (
    <>
        <CategoryList categories={response.data} selected={category} />
    </>
  )
}

export default Products