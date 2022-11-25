import banner from "../../../assets/images/Home/home-page-banner.webp";
import offer from "../../../assets/images/Home/3.webp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../../../components/ProductCard/ProductCard";

const Home = () => {
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertised-products"],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/advertisements`);
      return data;
    },
  });

  return (
    <div className="mx-auto max-w-screen-xl">
      <header>
        <img src={banner} className="mb-9" alt="" />
        <img src={offer} alt="" />
      </header>

      <main className="mt-9">
        {products.length ? (
          <section className="px-3">
            <h1 className="border-b-2">
              <span className="">Advertised Products</span>
            </h1>
            <div className="grid gap-4 my-4">
              {products.map((pd) => (
                <ProductCard key={pd._id} productData={pd} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
};

export default Home;
