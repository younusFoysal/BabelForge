import { isSever } from "@/lib/servewindo";
import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => {
    if (isSever())
      return {
        width: 0,
        height: 0,
      };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
