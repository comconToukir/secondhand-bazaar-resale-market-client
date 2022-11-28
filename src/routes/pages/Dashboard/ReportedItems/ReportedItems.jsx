import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import Loading from "../../../../components/Loading/Loading";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";

const ReportedItems = () => {
  const [deletingProduct, setDeletingProduct] = useState(null);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reported-products"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://secondhand-bazaar-server.vercel.app/reported-product/`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // console.log(data);
      return data;
    },
  });

  const closeModal = () => setDeletingProduct(null);

  const deleteProduct = (id) => {
    fetch(`https://secondhand-bazaar-server.vercel.app/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Reported product has been removed");
        refetch();
      })
      .catch((error) => {
        toast.error("Sorry! An error occurred. Please try again.");
      });
  };

  if (isLoading) return <Loading />;

  if (products.length === 0)
    return <div className="mx-5 my-3 text-2xl">No reports were found.</div>;

  return (
    <div className="m-4">
      <SectionHeader>
        <span className="px-4 py-1 bg-gray-800 text-2xl text-white">
          Reported Items
        </span>
      </SectionHeader>
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th className="rounded-none"></th>
              <th>id</th>
              <th>Picture</th>
              <th>Name</th>
              <th>Price</th>
              <th>Retail</th>
              <th>Condition</th>
              {/* <th>Category</th> */}
              <th>Description</th>
              <th>Contact</th>
              <th>Location</th>
              {/* <th>Sold</th> */}
              <th>Advertisement</th>
              <th className="rounded-none">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products
              ? products.map((pd, idx) => (
                  <tr key={pd._id}>
                    <th>{idx + 1}</th>
                    <td>{pd.reportedProductId}</td>
                    <td>
                      <img
                        src={pd.productData[0]?.image}
                        className="h-10"
                        alt="product_image"
                      />
                    </td>
                    <td>
                      <div
                        className="tooltip tooltip-right whitespace-normal max-w-[120px] z-10"
                        data-tip={pd.productData[0]?.productName}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden  whitespace-nowrap">
                          {pd.productData[0]?.productName}
                        </div>
                      </div>
                    </td>
                    <td>{pd.productData[0]?.askingPrice}</td>
                    <td>{pd.productData[0]?.retailPrice}</td>
                    <td>{pd.productData[0]?.productCondition}</td>
                    {/* <td>{pd.category}</td> */}
                    <td className="">
                      <div
                        className="tooltip tooltip-right max-w-[150px] z-20 whitespace-normal"
                        data-tip={pd.productData[0]?.description}
                      >
                        <div className="max-w-[120px] text-ellipsis overflow-hidden whitespace-nowrap">
                          {pd.productData[0]?.description}
                        </div>
                      </div>
                    </td>
                    <td>{pd.productData[0]?.contact}</td>
                    <td>{pd.productData[0]?.location}</td>
                    <td>
                      {pd.productData[0]?.isAdvertised ? "Running" : "None"}
                    </td>
                    <td>
                      <label
                        htmlFor="confirmation-modal"
                        className="btn-error py-1 px-3 rounded-sm cursor-pointer hover:bg-red-500"
                        onClick={() => setDeletingProduct(pd.reportedProductId)}
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
            modalData={deletingProduct}
            closeModal={closeModal}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ReportedItems;
