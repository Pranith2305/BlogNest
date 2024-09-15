import { Blog } from "../hooks";
import AppBar from "./AppBar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div class="flex justify-center">
        <div class="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-2xl pt-12">
          <div class=" col-span-8">
            <div class="text-5xl font-extrabold">{blog.title}</div>
            <div class="text-slate-500 pt-2">Posted on 20th FEB</div>
            <div class="pt-2">{blog.content}</div>
          </div>
          <div class="col-span-4">
            Author
            <div class="w-full flex">
              {/* <div class="pr-2 flex flex-col justify-center">
                <Avatar name={blog.author.name} size={6}/>
              </div> */}
              <div class="text-xl font-bold">
                {blog.author.name || "anonomous"}
              </div>
            </div>
            <div class="text-slate-600 pt-2">
              random sdkjbsljbsjblsbsljbdljsabjsdash;kashkh
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
