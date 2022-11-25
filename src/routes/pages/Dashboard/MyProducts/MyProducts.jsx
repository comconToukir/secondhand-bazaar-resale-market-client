import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../../../contexts/UserContext/UserContext";

const MyProducts = () => {
  const { user } = useContext(UserContext);

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

  // console.log(products);

  const addAdvertise = (id) => {
    fetch(`http://localhost:5000/advertise/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success('Your product is now being advertised.')
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
        toast.success('Your product has been removed')
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
              <th>Category</th>
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
                    <td>{pd.category}</td>
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
                        "running"
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
                      <button
                        className="btn-error py-1 px-3 rounded-sm"
                        onClick={() => deleteProduct(pd._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : null}

            {/* <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Littel, Schaden and Vandervort</td>
              <td>Canada</td>
              <td>12/16/2020</td>
              <td>Blue</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
