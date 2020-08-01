/**
 * @jest-environment node
 */

import { renderHook } from "@testing-library/react-hooks";

import useMediaQuery from "../src/useMediaQuery";

describe("useMediaQuery node", () => {
  it("returns false when window is undefined", () => {
    const mediaQuery = "only screen and (min-width: 1024px)";

    const { result } = renderHook(() => useMediaQuery(mediaQuery));

    expect(result.current).toBe(false);
  });
});
