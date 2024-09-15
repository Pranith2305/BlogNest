interface BlogCardProp {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProp) => {
  return (
    <div class="border-b border-slate-200 p-4 w-screen max-w-screen-md">
        <div class="flex">
        <Avatar name={authorName} size={8}/>
      <div class="flex justify-center  font-extralight pl-2 text-sm ">
         {authorName} 
         <div class="font-thin pl-2 text-slate-400 text-sm">
        . {publishDate}
      </div>
      </div>
      
        </div>
      <div class="text-xl font-bold">{title}</div>
      <div class="font-thin text-md">{content.slice(0, 100) + "..."}</div>
      <div class="text-slate-400 pt-4">{`${Math.ceil(content.length / 100)} minute(s) read`}</div>
    </div>
  );
};

export function Avatar({ name, size=4}: { name: string, size?: number }) {
  return (
    <div class={`relative inline-flex items-center justify-center  w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
      <span class="font-thin text-gray-600 text-xs dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}
