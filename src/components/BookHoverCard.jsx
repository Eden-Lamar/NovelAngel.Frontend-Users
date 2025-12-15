import { Chip } from "@heroui/chip";
import { capitalize } from "lodash";

export default function BookHoverCard({ book }) {
  if (!book) return null;

  return (
    <div
      className="hidden md:block absolute 
        bottom-0 left-0 right-0 bg-white dark:bg-gray-800 
        rounded-xl shadow-md p-4 z-30 animate-fadeIn"
    >
      {/* Title */}
      <h4 className="font-bold text-base text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-5">
        {capitalize(book.title)}
      </h4>

      {/* Tags */}
      {book.tags?.length > 0 && (
        <div className="flex flex-wrap gap-x-0.5 gap-y-1 mb-1.5">
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

            {book.tags.length > 3 && (
              <Chip
                size="sm"
                color="primary"
                variant="flat"
              >
                +{book.tags.length - 3}
              </Chip>
            )}
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
        {book.description || "No description available"}
      </p>
    </div>
  );
}
