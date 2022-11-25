import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import BookingModal from "../../../components/BookingModal/BookingModal";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { UserContext } from './../../../contexts/UserContext/UserContext';

const Category = () => {
  const [buyingProduct, setBuyingProduct] = useState(null);
  const products = useLoaderData();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => setBuyingProduct(null);

  const openBookModal = (product) => {
    if (!user) {
      toast("Please Login first.")
      navigate('/login', {state: {from: location}});
    } else {
      setBuyingProduct(product);
    }
  };

  return (
    <div className="my-9 p-4 min-h-screen">
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
      {buyingProduct ? <BookingModal buyingProduct={buyingProduct} closeModal={closeModal} /> : null}
    </div>
  );
};

export default Category;
