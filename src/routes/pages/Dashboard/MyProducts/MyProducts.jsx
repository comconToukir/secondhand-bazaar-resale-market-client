import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import Loading from "../../../../components/Loading/Loading";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
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
        `https://secondhand-bazaar-server.vercel.app/all-products/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return data;
    },
  });

  const addAdvertise = (id) => {
    fetch(`https://secondhand-bazaar-server.vercel.app/advertise/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
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
    fetch(`https://secondhand-bazaar-server.vercel.app/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
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

  if (isLoading) return <Loading />;

  if (products.length === 0)
    return (
      <div className="mx-5 my-3 text-xl">
        Your have not yet added any product or your products have been already
        bought. Please check My Buyers page.
      </div>
    );

  //TODO: Confirmation modal, Remove advertisement

  return (
    <div className="m-4">
      <SectionHeader>
        <span className="px-4 py-1 bg-gray-800 text-2xl text-white">
          My Products
        </span>
      </SectionHeader>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="rounded-none"></th>
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
              <th className="rounded-none">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              ? products.map((pd, idx) => (
                  <tr key={pd._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <img
                        src={pd.image}
                        className="h-10"
                        alt="product_image"
                      />
                    </td>
                    <td>
                      <div
                        className="tooltip tooltip-right whitespace-normal max-w-[120px] z-10"
                        data-tip={pd.productName}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden  whitespace-nowrap">
                          {pd.productName}
                        </div>
                      </div>
                    </td>
                    <td>{pd.askingPrice}</td>
                    <td>{pd.retailPrice}</td>
                    <td>{pd.productCondition}</td>
                    {/* <td>{pd.category}</td> */}
                    <td className="">
                      <div
                        className="tooltip tooltip-right max-w-[150px] z-20 whitespace-normal"
                        data-tip={pd.description}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden whitespace-nowrap">
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
                        className="btn-error py-1 px-3 rounded-sm cursor-pointer hover:bg-red-500"
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
