import { Blog } from "../hooks";
import AppBar from "./AppBar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
          <div className=" col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on 20th FEB</div>
            <div className="pt-2">{blog.content}</div>
          </div>
          <div className="col-span-4">
            Author
            <div className="w-full flex">
              {/* <div className="pr-2 flex flex-col justify-center">
                <Avatar name={blog.author.name} size={6}/>
              </div> */}
              <div className="text-xl font-bold">
                {blog.author.name || "anonomous"}
              </div>
            </div>
            <div className="text-slate-600 pt-2">
              random text being generated here in this column.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
