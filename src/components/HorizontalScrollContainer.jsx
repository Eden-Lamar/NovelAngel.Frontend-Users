import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

/**
 * A reusable horizontally scrollable container with left/right arrows.
 *
 * Props:
 * - children: JSX items inside the scroll area
 * - className: optional wrapper styles
 * - gap: optional Tailwind gap-x value, e.g., "gap-10"
 * - scrollAmount: px to scroll per click (default 800)
 */
export default function HorizontalScrollContainer({
  children,
  className = "",
  gap = "gap-10",
  scrollAmount = 800,
}) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollRef = useRef(null);

  const updateScrollState = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const tolerance = 5;

    // Detect whether content actually overflows
    const scrollable = scrollWidth > clientWidth + tolerance;
    setIsScrollable(scrollable);

    if (scrollable) {
      setShowLeftArrow(scrollLeft > tolerance);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - tolerance);
    } else {
      // hide both if not scrollable
      setShowLeftArrow(false);
      setShowRightArrow(false);
    }
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;

    // Delay initial check until layout stabilizes
    requestAnimationFrame(updateScrollState);

    // Listen for scrolling
    node.addEventListener("scroll", updateScrollState);

    // Recalculate on window resize (in case of responsive layout)
    window.addEventListener("resize", updateScrollState);

    // Run again once children finish rendering (helps on first load)
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(node);

    return () => {
      node.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      observer.disconnect();
    };
  }, [children]); // Re-run when children change (important!)

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;

    const containerWidth = scrollRef.current.clientWidth;

    // Dynamically calculate scroll amount based on screen size
    let dynamicScrollAmount;

    if (window.innerWidth < 640) {
      // small screen (mobile)
      dynamicScrollAmount = containerWidth * 0.8; // scroll about one screen width
    } else if (window.innerWidth < 1024) {
      // tablet / medium screen
      dynamicScrollAmount = containerWidth * 0.7;
    } else {
      // large screen (desktop)
      dynamicScrollAmount = scrollAmount; // use the default 800px
    }

    scrollRef.current.scrollBy({
      left: direction * dynamicScrollAmount,
      behavior: "smooth",
    });
  };

   // 🔹 Drag scroll (mouse & touch)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    const startDragging = (e) => {
      isDown = true;
      container.classList.add("dragging");
      startX = e.pageX || e.touches?.[0].pageX;
      scrollLeft = container.scrollLeft;
    };

    const stopDragging = () => {
      isDown = false;
      container.classList.remove("dragging");
    };

    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX || e.touches?.[0].pageX;
      const walk = (x - startX) * 1.2; // scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    // Event listeners for mouse & touch
    container.addEventListener("mousedown", startDragging);
    container.addEventListener("mouseleave", stopDragging);
    container.addEventListener("mouseup", stopDragging);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("touchstart", startDragging);
    container.addEventListener("touchend", stopDragging);
    container.addEventListener("touchmove", onMove);

    return () => {
      container.removeEventListener("mousedown", startDragging);
      container.removeEventListener("mouseleave", stopDragging);
      container.removeEventListener("mouseup", stopDragging);
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("touchstart", startDragging);
      container.removeEventListener("touchend", stopDragging);
      container.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <div className={`relative group/container ${className}`}>
      {/* Left Arrow */}
      {isScrollable && showLeftArrow && (
        <Button
          isIconOnly
          variant="flat"
          onClick={() => scrollByAmount(-1)}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 
            text-white backdrop-blur-sm opacity-0 group-hover/container:opacity-100 
            transition-opacity duration-300 h-1/2 w-8 rounded-lg mr-10"
        >
          <IoChevronBack className="text-3xl" />
        </Button>
      )}

      {/* Right Arrow */}
      {isScrollable && showRightArrow && (
        <Button
          isIconOnly
          variant="flat"
          onClick={() => scrollByAmount(1)}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 
            text-white backdrop-blur-sm opacity-0 group-hover/container:opacity-100 
            transition-opacity duration-300 h-1/2 w-8 rounded-lg"
        >
          <IoChevronForward className="text-3xl" />
        </Button>
      )}

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-visible scrollbar-hide pb-8 pt-4 
                  scroll-smooth snap-x snap-mandatory select-none cursor-grab"
      >
        <div className={`flex min-w-max ${gap} py-1`}>
          {Array.isArray(children)
            ? children.map((child, i) => (
                <div key={i} className="snap-start flex-shrink-0">
                  {child}
                </div>
              ))
            : children}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .dragging {
        cursor: grabbing;
        cursor: -webkit-grabbing;
        user-select: none;
        }
      `}</style>
    </div>
  );
}
