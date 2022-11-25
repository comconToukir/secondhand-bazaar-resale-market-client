import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../../../../components/ProductCard/ProductCard";

const HomeAdvertisement = () => {
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

  if (!products.length) return null;

  return (
    <section className="mt-40 px-3">
      <h1 className="border-b-2">
        <span className="">Advertised Products</span>
      </h1>
      <div className="grid gap-4 my-4">
        {products.map((pd) => (
          <ProductCard key={pd._id} productData={pd} />
        ))}
      </div>
    </section>
  );
};

export default HomeAdvertisement;
