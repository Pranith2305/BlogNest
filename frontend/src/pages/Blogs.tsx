import AppBar from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Blog, useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading || !blogs) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <BlogSkeleton />
        </div>
      </div>
    );
  }

  // Hard-coded fallback blogs
  const fallbackBlogs : Blog[] = [
    {
      id: '1',
      author: { name: 'John Doe' },
      title: 'Sample Blog Title 1',
      content: 'This is a sample blog content to display when no blogs are available.',
    },
    {
      id: '2',
      author: { name: 'Jane Smith' },
      title: 'Sample Blog Title 2',
      content: 'This is another sample blog content for demonstration purposes.',
    },
    {
      id: '3',
      author: { name: 'Alice Johnson' },
      title: 'Sample Blog Title 3',
      content: 'Here is some more sample blog content for when no real blogs are available.',
    },
    {
      id: '4',
      author: { name: 'Bob Brown' },
      title: 'Sample Blog Title 4',
      content: 'Another piece of sample blog content to show when no blogs are present.',
    },
    {
      id: '5',
      author: { name: 'Charlie Davis' },
      title: 'Sample Blog Title 5',
      content: 'Final sample blog content to be used as a fallback when needed.',
    },
  ];

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="">
          {blogs && blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                authorName={blog.author.name || "Unknown Author"}
                title={blog.title || "Untitled"}
                content={blog.content || "No content available"}
                publishDate="9 FEB 2024"
              />
            ))
          ) : (
            <div>
              <p className="text-2xl font-bold flex justify-center">No Blog Found.</p>
              {fallbackBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  authorName={blog.author.name}
                  title={blog.title}
                  content={blog.content}
                  publishDate="9 FEB 2024"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
