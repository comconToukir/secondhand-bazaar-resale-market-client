import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext/UserContext";

const MyProducts = () => {
  const { user } = useContext(UserContext);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["my-products"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/all-products/${user.email}`
      );
      return data;
    },
  });

  if (isLoading) return "loading";

  console.log(products);

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
              <th>Description</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Sold</th>
              <th>Advertised</th>
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
                        className="h-full"
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
                    <td>{pd.isAdvertised ? "true" : "false"}</td>
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
