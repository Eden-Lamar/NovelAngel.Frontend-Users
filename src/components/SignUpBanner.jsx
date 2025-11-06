import { Link } from "react-router-dom";
import { PiCoinsFill } from "react-icons/pi";

function SignUpBanner() {
  return (
    <div className="relative w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      {/* Subtle shimmer or light line at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />

      {/* Content */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-1 px-3 text-center">
        <span className="text-xs sm:text-sm md:text-base font-semibold tracking-wide">
          🎉 Register now and get{" "}
          <PiCoinsFill className="inline-block mx-1 text-gold animate__animated animate__pulse animate__infinite" />
          <span className="text-gold font-bold">30 free coins</span> to unlock premium chapters
        </span>

        {/* Optional “Sign Up” button on larger screens */}
        {/* <Link
          to="/signup"
          className="hidden sm:inline-flex items-center px-3 py-1 text-xs sm:text-sm font-semibold bg-white text-purple-700 rounded-full shadow hover:bg-yellow-100 transition"
        >
          Join Now
        </Link> */}
      </div>
    </div>
  );
}

export default SignUpBanner;
