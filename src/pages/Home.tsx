import { useHomeData } from "@hooks/useHomeData";

/**
 * Home component that fetches and displays products and categories.
 */
const Home = () => {
  const { data: state } = useHomeData();
  console.log(state)

  if (state.loading) {
    return <>loading products ... </>;
  }

  if (state.error) {
    return <>Error: {state.error}</>;
  }

  return (
    <>
      <div>
        <h2>Top 10 products</h2>
        {state.products.map((product) => (
          <h3 key={product.id}>{product.title}</h3>
        ))}
      </div>

      <div>
        <h2>Categories</h2>
        {state.categories.map((category) => (
          <h3 key={category.id}>{category.name}</h3>
        ))}
      </div>
    </>
  );
};

export default Home;
