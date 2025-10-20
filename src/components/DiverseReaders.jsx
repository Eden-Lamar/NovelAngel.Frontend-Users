function DiverseReaders() {
  return (
    <div className="hidden md:block relative rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-20 md:py-5 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-2">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
						Stories that connect readers across the world.
          </h2>
          <p className="text-base md:text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dive into novels from China, Japan, and Korea, translated into English. 
            Experience stories that have captivated millions worldwide.
          </p>
        </div>

        {/* Illustration Grid */}
        <div className="flex justify-center gap-6 flex-wrap">
          
          {/* Reading Person 1 */}
          <div className="">
            <img
							src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jade"
							alt="Avatar"
							className="w-[120px] h-[120px] aspect-[1/1] rounded-full object-cover"
						/>
          </div>

          {/* Reading Person 2 */}
          <div className="">
            <img
							src="https://api.dicebear.com/9.x/adventurer/svg?seed=Brian"
							alt="Avatar"
							className="w-[120px] h-[120px] aspect-[1/1] rounded-full object-cover"
						/>
          </div>

          {/* Reading Person 3 */}
					<div className="">
            <img
							src="https://api.dicebear.com/9.x/adventurer/svg?seed=Avery"
							alt="Avatar"
							className="w-[120px] h-[120px] aspect-[1/1] rounded-full object-cover"
						/>
          </div>

          {/* Globe/World */}
          <div className="">
            <img
							src="https://api.dicebear.com/9.x/adventurer/svg?seed=Ryker"
							alt="Avatar"
							className="w-[120px] h-[120px] aspect-[1/1] rounded-full object-cover"
						/>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DiverseReaders;