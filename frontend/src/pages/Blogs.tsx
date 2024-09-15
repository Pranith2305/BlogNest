import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>...loading</div>;
  }
  return (
    <div>
      <AppBar />
      <div class="flex justify-center">
        <div class="">
          {blogs && blogs.length > 0 ? (blogs.map((blogs) => (
            <BlogCard
              authorName={blogs.author.name || "Pranith kumar"}
              title={blogs.title || "Titile"}
              content={blogs.content || "content"}
              publishDate="9 FEB 2024"
            />
          ))) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
