import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import { UserContext } from "../../../../contexts/UserContext/UserContext";

const MyProducts = () => {
  const [deletingProduct, setDeletingProduct] = useState(null);
  const { user } = useContext(UserContext);

  const closeModal = () => {
    setDeletingProduct(null);
  };

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/all-products/${user.email}`
      );
      return data;
    },
  });

  if (isLoading) return "loading";

  const addAdvertise = (id) => {
    fetch(`http://localhost:5000/advertise/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Your product is now being advertised.");
        refetch();
      })
      .catch((error) => {
        toast.error("Sorry! An error occurred. Please try again.");
      });
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Your product has been removed");
        refetch();
      })
      .catch((error) => {
        toast.error("Sorry! An error occurred. Please try again.");
      });
  };

  //TODO: Confirmation modal, Remove advertisement

  return (
    <div className="px-5">
      <h1 className="text-2xl font-semibold mb-5">My products</h1>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th></th>
              <th>Picture</th>
              <th>Name</th>
              <th>Price</th>
              <th>Retail</th>
              <th>Condition</th>
              {/* <th>Category</th> */}
              <th>Description</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Sold</th>
              <th>Advertisement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              ? products.map((pd, idx) => (
                  <tr key={pd._id}>
                    <th>{idx}</th>
                    <td>
                      <img
                        src={pd.image}
                        className="h-10"
                        alt="product_image"
                      />
                    </td>
                    <td>
                      <div
                        className="tooltip tooltip-right max-w-[150px]"
                        data-tip={pd.productName}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden">
                          {pd.productName}
                        </div>
                      </div>
                    </td>
                    <td>{pd.askingPrice}</td>
                    <td>{pd.retailPrice}</td>
                    <td>{pd.productCondition}</td>
                    {/* <td>{pd.category}</td> */}
                    <td>
                      <div
                        className="tooltip tooltip-right max-w-[150px]"
                        data-tip={pd.description}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden">
                          {pd.description}
                        </div>
                      </div>
                    </td>
                    <td>{pd.contact}</td>
                    <td>{pd.location}</td>
                    <td>{pd.isSold ? "true" : "false"}</td>
                    <td>
                      {pd.isAdvertised ? (
                        "Running"
                      ) : (
                        <button
                          className="btn-primary py-1 px-3 rounded-sm"
                          onClick={() => addAdvertise(pd._id)}
                        >
                          Advertise
                        </button>
                      )}
                    </td>
                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        className="btn-error py-1 px-3 rounded-sm"
                        onClick={() => setDeletingProduct(pd)}
                      >
                        Delete
                      </label>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {deletingProduct ? (
          <ConfirmationModal
            modalTitle={deletingProduct.productName}
            message={`Warning! Deleted product can't be recovered`}
            confirmAction={deleteProduct}
            buttonText="Delete"
            modalData={deletingProduct._id}
            closeModal={closeModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyProducts;
