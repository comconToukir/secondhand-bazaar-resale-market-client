import { useLoaderData, useNavigation } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const Blog = () => {
  const blogData = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state === "loading") return <Loading />;

  return (
    <div className="max-w-screen-xl mx-auto p-4 grid gap-4 ">
      {blogData.map((blog) => {
        return (
          <div key={blog._id} className="p-10 bg-gray-100">
            <h2 className="text-2xl font-bold">{blog.question}</h2>
            <p className="p-3 whitespace-pre-wrap">{blog.answer}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
