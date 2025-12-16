import { HiSpeakerphone } from "react-icons/hi"; 

function SignUpBanner() {
  
  // Define content once so we can easily map it twice
  const bannerContent = [
    {
      id: 1,
      text: (
        <>
          Register now & get <span className="text-amber-500 font-bold mx-1">30 FREE COINS</span> to unlock premium chapters
        </>
      )
    },
    {
      id: 2,
      text: "New releases weekly - Stay tuned for more updates"
    },
    {
      id: 3,
      text: (
        <>
          Register now & get <span className="text-amber-500 font-bold mx-1">30 FREE COINS</span> to unlock premium chapters
        </>
      )
    },
    {
      id: 4,
      text: "Join the Novel Angel community today."
    }
  ];

  return (
    <div className="relative w-full bg-slate-800 text-white overflow-hidden h-8 flex items-center border-b border-white/10">
      
    {/* Container width must be large enough to hold double content.
            We use 'animate-ticker' to slide the whole strip. */}
      
      <div className="flex whitespace-nowrap animate-ticker">
        
        {/* Set 1: Original Content */}
        {bannerContent.map((item, index) => (
          <div key={`original-${index}`} className="flex items-center mx-8">
              <HiSpeakerphone className="text-blue-500 mr-2 animate-icon-pop" />
              <span className="text-xs md:text-sm font-medium tracking-wide">
                {item.text}
              </span>
          </div>
        ))}

        {/* Set 2: Duplicate Content (This fills the gap immediately) */}
        {bannerContent.map((item, index) => (
          <div key={`duplicate-${index}`} className="flex items-center mx-8">
              <HiSpeakerphone className="text-blue-500 mr-2 animate-icon-pop" />
              <span className="text-xs md:text-sm font-medium tracking-wide">
                {item.text}
              </span>
          </div>
        ))}

      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Move left by exactly 50% of the total width (which is the width of one full set) */
            transform: translateX(-50%);
          }
        }
        
        .animate-ticker {
          display: flex;
          /* Width needs to be fit-content to allow flexible scrolling */
          width: max-content; 
          animation: ticker 60s linear infinite;
        }

        .animate-ticker:hover {
            animation-play-state: paused;
        }

        @keyframes iconPop {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .animate-icon-pop {
          animation: iconPop 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default SignUpBanner;