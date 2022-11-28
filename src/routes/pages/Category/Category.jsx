import { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import BookingModal from "../../../components/BookingModal/BookingModal";
import Loading from "../../../components/Loading/Loading";
import ProductCard from "../../../components/ProductCard/ProductCard";
import useCheckRole from "../../../hooks/useCheckRole";
import { UserContext } from "./../../../contexts/UserContext/UserContext";
import SectionHeader from "./../../../components/SectionHeader/SectionHeader";

const Category = () => {
  const [buyingProduct, setBuyingProduct] = useState(null);
  const products = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();

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

  if (navigation.state === "loading") return <Loading />;

  return (
    <div className="px-4 my-4 min-h-screen max-w-screen-xl mx-auto">
      <SectionHeader>
        <span className="px-4 py-1 bg-gray-800 text-lg text-white">
          Products
        </span>
      </SectionHeader>
      <div className="grid gap-5">
        {products.length ? (
          products.map((pd) => (
            <ProductCard
              key={pd._id}
              productData={pd}
              openBookModal={openBookModal}
            />
          ))
        ) : (
          <h1 className="text-2xl text-center h-screen">
            Sorry, no products were found in this category.
          </h1>
        )}
      </div>
      {buyingProduct ? (
        <BookingModal buyingProduct={buyingProduct} closeModal={closeModal} />
      ) : null}
    </div>
  );
};

export default Category;
