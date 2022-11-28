import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";

const ThreeCategories = () => {
  const navigate = useNavigate();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["three-categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5000/get-three-categories`
      );
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="my-64 px-3">
      <h1 className="border-b-2 mb-4 border-gray-800 flex justify-between">
        <span className="px-4 py-1 bg-gray-800 text-lg text-white">Categories</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map((ct) => (
          <Link
            key={ct._id}
            to={`/category/${ct._id}`}
            className="h-48 group grid place-items-center border rounded-sm cursor-pointer transition"
          >
            <span className="text-2xl font-semibold group group-hover:text-3xl group-hover:drop-shadow-sm transition-all">
              {ct.categoryName}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ThreeCategories;
