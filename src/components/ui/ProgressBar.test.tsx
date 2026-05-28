import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders the percentage in aria-valuenow", () => {
    const { getByRole } = render(<ProgressBar value={7} max={10} />);
    const bar = getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "70");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });
  it("clamps over-max to 100%", () => {
    const { getByRole } = render(<ProgressBar value={20} max={10} />);
    expect(getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
  });
  it("renders 0% when max is 0", () => {
    const { getByRole } = render(<ProgressBar value={5} max={0} />);
    expect(getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });
  it("uses neutral fill for tone='auto' with max=0", () => {
    const { getByRole } = render(<ProgressBar value={5} max={0} tone="auto" />);
    const fill = getByRole("progressbar").firstElementChild!;
    expect(fill.className).toContain("bg-line-strong");
  });
});
