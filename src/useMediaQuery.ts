import { useEffect, useState, useMemo, useCallback } from "react";

const useMediaQuery = (mediaQuery: string) => {
  const mediaQueryList = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) {
      return;
    }

    return window.matchMedia(mediaQuery);
  }, [mediaQuery]);

  const [matches, setMatches] = useState(
    mediaQueryList ? mediaQueryList.matches : false
  );

  const onChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    if (!mediaQueryList) {
      return;
    }

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", onChange);
    } else {
      mediaQueryList.addListener(onChange);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", onChange);
      } else {
        mediaQueryList.removeListener(onChange);
      }
    };
  }, [mediaQueryList, onChange]);

  return matches;
};

export default useMediaQuery;
