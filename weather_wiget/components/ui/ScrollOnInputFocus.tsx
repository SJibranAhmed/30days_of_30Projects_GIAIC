import { useEffect } from "react";

const ScrollOnInputFocus = () => {
  useEffect(() => {
    const handleFocus = () => {
      if (document.activeElement && document.activeElement.tagName === "INPUT") {
        const yOffset = -100; // Adjust this value based on your layout
        const yPosition =
          (document.activeElement as HTMLElement).getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    };

    // Listen for focus and resize events
    window.addEventListener("focusin", handleFocus);
    window.addEventListener("resize", handleFocus);

    return () => {
      window.removeEventListener("focusin", handleFocus);
      window.removeEventListener("resize", handleFocus);
    };
  }, []);

  return null;
};

export default ScrollOnInputFocus;
