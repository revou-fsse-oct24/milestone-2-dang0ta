// import { Response } from "@actions/api";
// import { getLast10Products } from "@actions/products";
// import { Product, ProductRaw } from "@models/product";
// import { useEffect, useState } from "react";

// type Query = {
//     offset: number;
//     limit: number;
//     category?: string;
// }

// type State = {
//     status: "init" | "loading" | "loaded";
//     response?: Response<Product[]>;
// }

// export const useCategory = () => {
//     const [query, setQuery] = useState<Query>({offset: 0, limit: 10})
//     const [state, setState] =useState<State>({status: "init"})

//     const fetchProduct = async () => {
//         setState({status: "loading"})
//         try {
//             const res = await getLast10Products(query)
//             setState({status: "loaded", response: res})
//         } catch (e) {
//             console.warn({e})
//             setState({
//                 status: "loaded",
//                 response: {
//                     status: "error",
//                     data: [],
//                     error: e.message
//                 }
//             })
//         }
//     }

//     useEffect(() => {

//     }, [query])


// }