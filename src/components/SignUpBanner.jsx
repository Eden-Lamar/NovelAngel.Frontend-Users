import { Link } from "react-router-dom";
import { PiCoinsFill } from "react-icons/pi";
import { HiSpeakerphone } from "react-icons/hi"; // Better icon for announcements

function SignUpBanner() {
  return (
    // changed bg to a solid dark slate/cyan for a clean, professional news-bar look
    <div className="relative w-full bg-slate-800 text-white overflow-hidden h-8 flex items-center border-b border-white/10">
      
      {/* The scrolling container */}
      <div className="flex whitespace-nowrap animate-ticker">
        
        {/* Content Block 1 */}
        <div className="flex items-center mx-8">
            <HiSpeakerphone className="text-blue-500 mr-2 animate-icon-pop" />
            <span className="text-xs md:text-sm font-medium tracking-wide">
              Register now & get 
              <span className="text-amber-500 font-bold mx-1">30 FREE COINS</span>
              to unlock premium chapters!
            </span>
        </div>

        {/* Content Block 2 (Duplicate for seamless loop visual) */}
        <div className="flex items-center mx-8">
            <HiSpeakerphone className="text-blue-500 mr-2 animate-icon-pop" />
            <span className="text-xs md:text-sm font-medium tracking-wide">
              New releases weekly - Stay tuned for more updates 
            </span>
        </div>

        {/* Content Block 3 (Duplicate of #1 to ensure loop feels endless) */}
        <div className="flex items-center mx-8">
          <HiSpeakerphone className="text-blue-500 mr-2 animate-icon-pop" />
            <span className="text-xs md:text-sm font-medium tracking-wide">
              Register now & get 
              <span className="text-amber-500 font-bold mx-1">30 FREE COINS</span>
              to unlock premium chapters
            </span>
        </div>

         {/* Content Block 4 */}
        <div className="flex items-center mx-8">
            <HiSpeakerphone className="text-blue-500 mr-2 animate-icon-pop" />
            <span className="text-xs md:text-sm font-medium tracking-wide">
              Join the Novel Angel community today.
            </span>
        </div>

      </div>

      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(100%); /* Start off-screen right */
          }
          100% {
            transform: translateX(-100%); /* Move all the way to left */
          }
        }
        
        .animate-ticker {
          /* Adjust duration (20s) to control speed. Linear is crucial for smooth flow. */
          animation: ticker 60s linear infinite;
        }

        /* Pauses the ticker when user hovers over it to read */
        .animate-ticker:hover {
            animation-play-state: paused;
        }

        /* NEW ANIMATION: 'iconPop'
          1. Scales up to 1.2x size (makes it jump out)
        */
        @keyframes iconPop {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);

          }
        }

        .animate-icon-pop {
          animation: iconPop 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default SignUpBanner;