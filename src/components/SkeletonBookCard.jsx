import { Skeleton } from "@heroui/skeleton";

function SkeletonBookCard({index}) {
  return (
    <div
				key={index}
				className="relative w-[220px] flex flex-col flex-shrink-0 shadow-xl rounded-xl"
				>
				{/* Skeleton for book image (3/4 ratio) */}
				<div className="relative overflow-hidden aspect-[3/4] w-full rounded-xl">
						<Skeleton className="h-full w-full rounded-xl"/>
				</div>

				{/* Overlay (transparent to keep same card look) */}
				<div className="absolute inset-0 bg-black opacity-20 rounded-xl"/>

				{/* Skeleton text overlay */}
				<div className="absolute inset-0 flex justify-between p-4 space-y-2">
						<Skeleton className=" h-1 w-[40%] rounded-xl py-3" />
						<Skeleton className=" h-6 w-6 rounded-full" />
				</div>
		</div>
  );
}

export default SkeletonBookCard;