import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import { BlogSkeleton } from "../components/BlogSkeleton";

function Blog() {
  // Destructure id from useParams()
  const { id } = useParams<{ id: string }>();
  
  // Fetch the blog data using the id
  const { loading, blog } = useBlog({
    id: id || ''
  });

  // Show loading skeleton while fetching data
  if (loading) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  // Show a message if the blog is not found
  if (!blog) {
    return (
      <div>
        Blog not found
      </div>
    );
  }

  // Render the blog content if it is found
  return (
    <div className="">
      <div>
        <FullBlog blog={blog} />
      </div>
    </div>
  );
}

export default Blog;
