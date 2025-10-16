function SkeletonBookCard({index}) {
  return (
    <div
				key={index}
				className="relative w-[220px] flex flex-col flex-shrink-0 shadow-xl rounded-xl"
				>
				{/* Skeleton for book image (3/4 ratio) */}
				<div className="relative overflow-hidden aspect-[3/4] w-full rounded-xl">
						<div className="skeleton h-full w-full rounded-xl"></div>
				</div>

				{/* Overlay (transparent to keep same card look) */}
				<div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>

				{/* Skeleton text overlay */}
				<div className="absolute inset-0 flex justify-between p-4 space-y-2">
						<div className="skeleton h-1 w-[40%] rounded-xl py-3"></div>
						<div className="skeleton h-6 w-6 rounded-full"></div>
				</div>
		</div>
  );
}

export default SkeletonBookCard;