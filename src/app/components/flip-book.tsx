import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Loader2, RotateCcw } from "lucide-react";
import { FlipPage } from "./flip-page";

// --- CONSTANTS ---
// Centralizing magic numbers for easier tuning and maintenance
const ANIMATION_DURATION = 1.2; // seconds
const ANIMATION_DURATION_MS = ANIMATION_DURATION * 1000;

// Delays for internal state updates during the animation (in ms)
const DELAY_PAGE_CHANGE = 100;    // When to switch the underlying data
const DELAY_SHOW_UNDER = 300;     // When to show the content underneath
const DELAY_SHOW_CONTENT = 400;   // When to show the content on the flipping page
const DELAY_COMPLETE = ANIMATION_DURATION_MS; // Must match animation duration

export interface CatalogPageData {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface FlipBookProps {
  pages: CatalogPageData[];
}

export function FlipBook({ pages }: FlipBookProps) {
  // State
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [flipDirection, setFlipDirection] = useState<"forward" | "backward">("forward");

  // Visibility States (to prevent z-fighting and content bleeding)
  const [showContent, setShowContent] = useState(true);
  const [showUnderContent, setShowUnderContent] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Virtual Pages for Animation
  const [displayPage, setDisplayPage] = useState(0);
  const [flippingPageIndex, setFlippingPageIndex] = useState(0);

  // Refs for safety (checking mount status)
  const isMounted = useRef(true);

  // Monitor mount status
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  // Preload Images
  useEffect(() => {
    let loaded = 0;
    const totalImages = pages.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
      return;
    }

    pages.forEach((page) => {
      const img = new Image();
      img.onload = () => {
        if (!isMounted.current) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalImages) setImagesLoaded(true);
      };
      img.onerror = () => {
        if (!isMounted.current) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalImages) setImagesLoaded(true);
      };
      img.src = page.image;
    });
  }, [pages]);

  // --- Animation Orchestrator ---
  // A helper to manage the sequence of state updates safely
  const runFlipSequence = useCallback((
    updateFn: () => void,
    onComplete?: () => void
  ) => {
    if (!isMounted.current) return;

    // 1. Start Animation State
    setIsFlipping(true);
    setShowContent(false);
    setShowUnderContent(false);

    // 2. Schedule Updates
    setTimeout(() => {
      if (isMounted.current) updateFn();
    }, DELAY_PAGE_CHANGE);

    setTimeout(() => {
      if (isMounted.current) setShowUnderContent(true);
    }, DELAY_SHOW_UNDER);

    setTimeout(() => {
      if (isMounted.current) setShowContent(true);
    }, DELAY_SHOW_CONTENT);

    setTimeout(() => {
      if (isMounted.current) {
        setIsFlipping(false);
        if (onComplete) onComplete();
      }
    }, DELAY_COMPLETE);
  }, []);

  const openBook = () => {
    if (!isOpen && !isFlipping) {
      setDisplayPage(1);
      setFlippingPageIndex(0);
      setFlipDirection("forward");

      runFlipSequence(
        () => {
          setIsOpen(true);
          setCurrentPage(1);
        }
      );
    }
  };

  const closeBook = () => {
    if (isOpen && !isFlipping) {
      // Use standard flip sequence for closing (Flip Page 0 Backward)
      setIsClosing(true);
      setDisplayPage(0); // Destination left is 0 (Closed)
      setFlippingPageIndex(0); // Flip the Cover (Page 0)
      setFlipDirection("backward");

      runFlipSequence(() => {
        setIsClosing(false);
        setIsOpen(false);
        setCurrentPage(0);
      });
    }
  };

  const goToNextPage = () => {
    if (isFlipping || !isOpen) return;
    if (currentPage >= pages.length - 1) return;

    const targetPage = currentPage + 2;
    const pageToFlip = currentPage + 1;

    setDisplayPage(targetPage);
    setFlippingPageIndex(pageToFlip);
    setFlipDirection("forward");

    runFlipSequence(() => {
      setCurrentPage(targetPage);
    });
  };

  const goToPrevPage = () => {
    if (isFlipping || !isOpen) return;

    if (currentPage === 1) {
      closeBook();
      return;
    }

    const targetPage = currentPage - 2;
    const pageToFlip = targetPage + 1;

    setDisplayPage(targetPage);
    setFlippingPageIndex(pageToFlip);
    setFlipDirection("backward");

    runFlipSequence(() => {
      setCurrentPage(targetPage);
    });
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if input is focused (though no inputs here yet)
      if (e.defaultPrevented) return;

      if (!isOpen) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") {
          e.preventDefault();
          openBook();
        }
      } else {
        if (e.key === "ArrowRight") {
          goToNextPage();
        } else if (e.key === "ArrowLeft") {
          goToPrevPage();
        } else if (e.key === "Escape") {
          closeBook();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, isFlipping, isOpen, pages.length]); // Added pages.length dependency

  // Logic to determine what to show on the right side during flip
  // If flipping forward, we want to show the DESTINATION Right page (displayPage + 1) underneath.
  // If flipping backward, we want to show the SOURCE Right page (currentPage + 1) underneath?
  // Actually, easiest is:
  // Forward: Static Right = Next Stack Top (Target + 1)
  // Backward: Static Right = Current Stack Top (Current + 1) -> Wait, if we flip left to right, we cover the Right Stack. 
  // So Right Stack must be the Destination (Target + 1).

  const rightPageIndex = isFlipping
    ? (flipDirection === "forward" ? displayPage + 1 : currentPage + 1) // On back flip, we reveal Current (which becomes Right)
    : currentPage + 1;

  const visibleLeftPage = isFlipping
    ? (flipDirection === "forward" ? currentPage : (displayPage === 0 ? -1 : displayPage)) // If closing (going to 0), Left Side is empty (-1).
    : currentPage;

  const hasRightPage = rightPageIndex < pages.length;

  if (!imagesLoaded) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-white/70 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex flex-col items-center justify-center p-4 overflow-hidden gap-8">
      {/* Hidden container for SEO / Accessibility or just preloading structure logic */}
      <div className="hidden">
        {pages.map((p) => <img key={p.id} src={p.image} alt={p.title} />)}
      </div>

      {/* Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] bg-amber-900/20 blur-3xl" />
      </div>

      <div className="relative" style={{ perspective: "2500px" }}>
        {/* Book Shadow/Backdrop */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/60 blur-2xl"
          animate={{ width: isOpen ? "90%" : "45%", height: "95%" }}
          transition={{ duration: ANIMATION_DURATION, ease: [0.43, 0.13, 0.23, 0.96] }}
        />

        <div className="relative flex" style={{ transformStyle: "preserve-3d" }}>

          {/* LEFT PAGE (Static/Destination) */}
          <motion.div
            className="relative bg-white shadow-2xl overflow-hidden"
            initial={{ opacity: 0, x: 50, width: 0, height: "min(58vw, 780px)" }}
            animate={{
              width: isOpen ? "min(42vw, 550px)" : 0,
              height: "min(58vw, 780px)",
              opacity: (isOpen && !isClosing && visibleLeftPage >= 0) ? 1 : 0, // Hide immediately if invalid page
              x: isOpen && !isClosing ? 0 : -100,
              scale: isClosing ? 0.95 : 1,
            }}
            transition={{ duration: isClosing ? 0.6 : ANIMATION_DURATION, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            {isOpen && !isClosing && visibleLeftPage >= 0 && (
              // Hide Static Left if it's the one being flipped backward.
              // Backward flip: The leaf starts on left (showing Back Face = flippingPageIndex + 1).
              // So if visibleLeftPage == flippingPageIndex + 1, hide it to avoid duplication.
              !(isFlipping && flipDirection === "backward" && visibleLeftPage === flippingPageIndex + 1) && (
                <FlipPage
                  key={`left-${pages[visibleLeftPage].id}`}
                  image={pages[visibleLeftPage].image}
                  title={pages[visibleLeftPage].title}
                  description={pages[visibleLeftPage].description}
                  pageNumber={visibleLeftPage + 1}
                  side="left"
                  showContent={showContent}
                />
              )
            )}
            {/* Spine Shadow Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-20" />
          </motion.div>

          {/* SPINE */}
          <motion.div
            className="bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 relative shadow-inner z-20"
            // Hide backbone when closed
            animate={{ width: isOpen && !isClosing ? "16px" : "0px", opacity: isOpen && !isClosing ? 1 : 0 }}
            transition={{ duration: isClosing ? 0.6 : ANIMATION_DURATION, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
          </motion.div>

          {/* RIGHT CONTAINER */}
          <motion.div
            className="relative overflow-hidden"
            animate={{ width: "min(42vw, 550px)", height: "min(58vw, 780px)" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Background Page (Right side static) */}
            <motion.div
              className={`absolute inset-0 ${hasRightPage && isOpen ? "bg-white" : "bg-transparent"}`}
              animate={{ opacity: isClosing ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen && hasRightPage && (
                <>
                  <FlipPage
                    key={`right-${pages[rightPageIndex].id}`}
                    image={pages[rightPageIndex].image}
                    title={pages[rightPageIndex].title}
                    description={pages[rightPageIndex].description}
                    pageNumber={rightPageIndex + 1}
                    side="right"
                    showContent={showUnderContent}
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-20" />
                </>
              )}
            </motion.div>

            {/* COVER (When Closed) */}
            {!isOpen && (
              <motion.div
                className="absolute inset-0 bg-white shadow-2xl origin-left cursor-pointer"
                style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                initial={{ opacity: isClosing ? 1 : 0, x: isClosing ? -50 : 0 }}
                animate={{ rotateY: 0, opacity: 1, x: 0 }}
                transition={{ duration: ANIMATION_DURATION, ease: [0.43, 0.13, 0.23, 0.96] }}
                onClick={openBook}
                whileHover={{ scale: 1.02 }}
              >
                <FlipPage
                  image={pages[0].image}
                  title={pages[0].title}
                  description={pages[0].description}
                  pageNumber={1}
                  side="right"
                  showContent={true} // Ensure content is shown on cover
                />
              </motion.div>
            )}

            {/* FLIPPING PAGE (The one animating) */}
            {isOpen && (
              <motion.div
                key={`flip-${flippingPageIndex}`}
                className="absolute inset-0 origin-left z-50"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateY: flipDirection === "forward" ? 0 : -180, z: 0 }}
                animate={{
                  rotateY: flipDirection === "forward" ? -180 : 0,
                  z: [0, 50, 0] // Lift up in the middle of the flip
                }}
                transition={{
                  duration: ANIMATION_DURATION,
                  ease: [0.645, 0.045, 0.355, 1],
                  z: { duration: ANIMATION_DURATION, times: [0, 0.5, 1], ease: "easeInOut" }
                }}
              >
                {flippingPageIndex < pages.length && (
                  <>
                    {/* FRONT FACE */}
                    <div
                      className="absolute inset-0 bg-white shadow-2xl backface-hidden"
                      style={{ backfaceVisibility: "hidden" }} // Default rotateY(0)
                    >
                      <FlipPage
                        key={`flip-${pages[flippingPageIndex].id}`}
                        image={pages[flippingPageIndex].image}
                        title={pages[flippingPageIndex].title}
                        description={pages[flippingPageIndex].description}
                        pageNumber={flippingPageIndex + 1}
                        side="right"
                        showContent={showContent}
                      />
                      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-20" />

                      {/* Dynamic Lighting/Shadow effect during flip - "Sheen" - On Front Face */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-black/40 pointer-events-none z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: ANIMATION_DURATION, times: [0, 0.5, 1] }}
                      />
                      {/* Dynamic Highlight for curvature */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none z-30"
                        style={{ backgroundSize: "200% 100%" }}
                        initial={{ backgroundPosition: "100% 0%" }}
                        animate={{ backgroundPosition: ["100% 0%", "0% 0%"] }}
                        transition={{ duration: ANIMATION_DURATION, ease: "linear" }}
                      />
                    </div>

                    {/* BACK FACE of the Flipping Page */}
                    <div
                      className="absolute inset-0 bg-white shadow-2xl backface-hidden"
                      style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                    >
                      {/* The Back Face is always the next index */}
                      {flippingPageIndex + 1 < pages.length && (
                        <FlipPage
                          image={pages[flippingPageIndex + 1].image}
                          title={pages[flippingPageIndex + 1].title}
                          description={pages[flippingPageIndex + 1].description}
                          pageNumber={flippingPageIndex + 2}
                          side="left" // Back face acts as left side visually
                          showContent={true}
                        />
                      )}
                      {/* Shadow for back face */}
                      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-20" />
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* NAVIGATION BUTTONS */}
        {isOpen && (
          <>
            <button
              onClick={goToPrevPage}
              disabled={isFlipping}
              aria-label="Página anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-24 bg-white/90 hover:bg-white p-4 rounded-full shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            {currentPage < pages.length - 2 ? (
              <button
                onClick={goToNextPage}
                disabled={isFlipping}
                aria-label="Próxima página"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-24 bg-white/90 hover:bg-white disabled:opacity-50 disabled:hover:scale-100 p-4 rounded-full shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>
            ) : (
              <button
                onClick={closeBook}
                disabled={isFlipping}
                aria-label="Voltar ao início"
                title="Voltar ao início"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-24 bg-white/90 hover:bg-amber-50 text-amber-900 disabled:opacity-50 disabled:hover:scale-100 p-4 rounded-full shadow-xl transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <RotateCcw className="w-6 h-6 text-gray-800" />
              </button>
            )}
          </>
        )}
      </div>

      {/* PAGE INDICATOR / FOOTER */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg z-50 pointer-events-none"
        >
          <span className="text-xs font-medium text-gray-800 uppercase tracking-wide">
            Páginas {currentPage + 1}
            {currentPage + 1 < pages.length ? `-${currentPage + 2}` : ""}
            {" "}de {pages.length}
          </span>
        </motion.div>
      )}
    </div>
  );
}