import { renderHook, act } from "@testing-library/react-hooks";

import { create } from "./mediaQueryList";
import useMediaQuery from "../src/useMediaQuery";

describe("useMediaQuery", () => {
  beforeEach(() => {
    window.matchMedia = jest.fn();
  });

  it("returns true when media query matches on mount", () => {
    const mediaQuery = "only screen and (min-width: 1024px)";
    const mediaQueryList = create(mediaQuery)(true);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList
    );

    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    expect(result.current).toBe(true);
  });

  it("returns false when media query doesn't match on mount", () => {
    const mediaQuery = "only screen and (min-width: 1024px)";
    const mediaQueryList = create(mediaQuery)(false);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList
    );

    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    expect(result.current).toBe(false);
  });

  it("returns false when media query doesn't match on change", () => {
    const mediaQuery = "only screen and (min-width: 1024px)";
    const mediaQueryList = create(mediaQuery);
    const matchingMediaQueryList = mediaQueryList(true);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => matchingMediaQueryList
    );

    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    act(() => {
      matchingMediaQueryList.dispatchEvent("change", { matches: false });
    });
    expect(result.current).toBe(false);
  });

  it("returns true when media query matches on change", () => {
    const mediaQuery = "only screen and (min-width: 1024px)";
    const mediaQueryList = create(mediaQuery);
    const nonMatchingMediaQueryList = mediaQueryList(false);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => nonMatchingMediaQueryList
    );

    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    act(() => {
      nonMatchingMediaQueryList.dispatchEvent("change", { matches: true });
    });
    expect(result.current).toBe(true);
  });

  it("removes change listener on unmount when removeEventListener is available", () => {
    const mediaQuery = "only screen and (min-width: 1024px)";
    const mediaQueryList = create(mediaQuery)(true);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList
    );

    const { unmount } = renderHook(() => useMediaQuery(mediaQuery));

    unmount();

    expect(mediaQueryList.removeEventListener).toBeCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("removes change listener on unmount when removeEventListener is unavailable", () => {
    const mediaQuery = "only screen and (min-width: 1024px)";
    const mediaQueryList = create(mediaQuery, false)(true);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList
    );

    const { unmount } = renderHook(() => useMediaQuery(mediaQuery));

    unmount();

    expect(mediaQueryList.removeListener).toBeCalledWith(expect.any(Function));
  });

  it("removes change listener when a different media query is used and removeEventListener is available", () => {
    const mediaQuery1 = "only screen and (min-width: 1024px)";
    const mediaQueryList1 = create(mediaQuery1)(true);

    const mediaQuery2 = "only screen and (max-width: 600px)";
    const mediaQueryList2 = create(mediaQuery2)(true);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList1
    );

    const { rerender } = renderHook((mediaQuery) => useMediaQuery(mediaQuery), {
      initialProps: mediaQuery1,
    });

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList2
    );
    rerender(mediaQuery2);

    expect(mediaQueryList1.removeEventListener).toBeCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("removes change listener when a different media query is used and removeEventListener is unavailable", () => {
    const mediaQuery1 = "only screen and (min-width: 1024px)";
    const mediaQueryList1 = create(mediaQuery1, false)(true);

    const mediaQuery2 = "only screen and (max-width: 600px)";
    const mediaQueryList2 = create(mediaQuery2, false)(true);

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList1
    );

    const { rerender } = renderHook((mediaQuery) => useMediaQuery(mediaQuery), {
      initialProps: mediaQuery1,
    });

    (window.matchMedia as jest.Mock).mockImplementationOnce(
      () => mediaQueryList2
    );
    rerender(mediaQuery2);

    expect(mediaQueryList1.removeListener).toBeCalledWith(expect.any(Function));
  });

  it("returns false when window has no matchMedia method", () => {
    delete window.matchMedia;
    const mediaQuery = "only screen and (min-width: 1024px)";

    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    expect(result.current).toBe(false);
  });
});
