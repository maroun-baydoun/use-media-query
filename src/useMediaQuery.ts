import { useEffect, useState, useMemo, useCallback } from "react";

const useMediaQuery = (mediaQuery: string) => {
  const mediaQueryList = useMemo(() => window.matchMedia(mediaQuery), [
    mediaQuery,
  ]);

  const [matches, setMatches] = useState(mediaQueryList.matches);

  const onChange = useCallback((event: MediaQueryListEvent) => {
    setMatches(event.matches);
  }, []);

  useEffect(() => {
    mediaQueryList.addEventListener("change", onChange);

    return () => {
      mediaQueryList.removeEventListener("change", onChange);
    };
  }, [mediaQueryList, onChange]);

  return matches;
};

export default useMediaQuery;
