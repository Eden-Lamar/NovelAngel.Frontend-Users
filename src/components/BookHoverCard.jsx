import { Chip } from "@heroui/chip";
import { capitalize } from "lodash";

export default function BookHoverCard({ book }) {
  if (!book) return null;

  return (
    <div
      className={`hidden md:block absolute 
        ${book.title.length > 25 ? "top-[40%]" : "top-[47%]"}
        left-0 right-0 bg-white dark:bg-gray-800 
        rounded-xl shadow-md p-4 z-30 animate-fadeIn`}
    >
      {/* Title */}
      <h4 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-5">
        {capitalize(book.title)}
      </h4>

      {/* Tags */}
      {book.tags?.length > 0 && (
        <div className="flex gap-1 mb-3">
          {book.tags.slice(0, 3).map((tag, i) => (
            <Chip
              key={i}
              color="primary"
              variant="flat"
              size="sm"
              className="text-xs"
            >
              {capitalize(tag)}
            </Chip>
          ))}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
        {book.description || "No description available"}
      </p>
    </div>
  );
}
