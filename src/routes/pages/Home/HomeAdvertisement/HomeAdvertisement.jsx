import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookingModal from "../../../../components/BookingModal/BookingModal";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { UserContext } from "../../../../contexts/UserContext/UserContext";

const HomeAdvertisement = () => {
  const [buyingProduct, setBuyingProduct] = useState(null);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => setBuyingProduct(null);

  const openBookModal = (product) => {
    if (!user) {
      toast("Please Login first.");
      navigate("/login", { state: { from: location } });
    } else {
      setBuyingProduct(product);
    }
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["3-advertised-products"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://secondhand-bazaar-server.vercel.app/v2/home-advertisements`
      );
      return data;
    },
  });

  if (!products.length) return null;

  return (
    <section className="my-64 px-3">
      <SectionHeader>
        <span className="px-4 py-1 bg-gray-800 text-lg text-white">
          Advertised Products
        </span>
        <Link
          to="/advertisements"
          className="px-4 py-1 bg-gray-600 text-lg text-white"
        >
          See All
        </Link>
      </SectionHeader>
      <div className="grid gap-4 my-4">
        {products.map((pd) => (
          <ProductCard
            key={pd._id}
            productData={pd}
            openBookModal={openBookModal}
          />
        ))}
      </div>
      {buyingProduct ? (
        <BookingModal buyingProduct={buyingProduct} closeModal={closeModal} />
      ) : null}
    </section>
  );
};

export default HomeAdvertisement;
