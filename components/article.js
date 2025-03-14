import Link from "next/link";
import Image from "next/image";
import { parseISO, format } from "date-fns";

export default function Article({ article }) {
  const { slug, date, title, readingTime, thumbnail } = article;

  return (
    <div className="pt-5 p-8 rounded-3xl border-2 shadow-lg border-purple-300 bg-white dark:bg-gray-800 dark:border-purple-600 dark:text-white flex flex-col justify-between transition-colors duration-300">
    {thumbnail && (
  <Link href={`/blog/${slug}`} passHref>
    <a className="block relative w-full h-[120px]"> 
      <Image
        src={thumbnail}
        alt={title}
        width={600}
        height={300}
        className="rounded-xl object-cover"
        style={{ objectFit: "cover" }} 
      />
    </a>
  </Link>
)}

      <Link href={`/blog/${slug}`} passHref>
        <a className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{title}</a>
      </Link>
      <div className="mt-5 flex justify-between items-center text-gray-600 dark:text-gray-400">
        <small>{readingTime?.text || "Estimación no disponible"}</small>
        <small>{format(parseISO(date), "MMM dd, yyyy")}</small>
      </div>
    </div>
  );
}
