import { useContext, useState } from "react";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import BookingModal from "../../../components/BookingModal/BookingModal";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";

const Advertisements = () => {
  const [buyingProduct, setBuyingProduct] = useState(null);
  const advertisements = useLoaderData();

  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(UserContext);

  const closeModal = () => setBuyingProduct(null);

  const openBookModal = (product) => {
    if (!user) {
      toast("Please Login first.");
      navigate("/login", { state: { from: location } });
    } else {
      setBuyingProduct(product);
    }
  };

  if (navigation.state === "loading")
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="px-4 my-8 max-w-screen-xl mx-auto">
      <SectionHeader>
        <span className="px-4 py-1 bg-gray-800 text-2xl text-white">
          Advertised Products
        </span>
      </SectionHeader>
      <div className="grid gap-4 my-4">
        {advertisements.map((pd) => (
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
    </div>
  );
};

export default Advertisements;
