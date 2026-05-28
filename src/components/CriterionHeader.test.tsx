import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CriterionHeader from "./CriterionHeader";

const sample = {
  id: "c2",
  label: "Observation skills",
  sub: "Records what they notice",
  c4: "Notices subtle details",
  c3: "Notices most",
  c2: "Notices few",
  c1: "Misses major",
};

describe("CriterionHeader", () => {
  it("renders label, sub, position, and four descriptors", () => {
    render(
      <CriterionHeader
        criterion={sample}
        index={1}
        total={6}
        onPrev={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByText("Observation skills")).toBeInTheDocument();
    expect(screen.getAllByText(/2 \/ 6/i).length).toBeGreaterThan(0);
    expect(screen.getByText("Notices subtle details")).toBeInTheDocument();
    expect(screen.getByText("Misses major")).toBeInTheDocument();
  });

  it("calls onPrev and onNext when buttons clicked", () => {
    const onPrev = vi.fn();
    const onNext = vi.fn();
    render(
      <CriterionHeader
        criterion={sample}
        index={1}
        total={6}
        onPrev={onPrev}
        onNext={onNext}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /prev criterion/i }));
    fireEvent.click(screen.getByRole("button", { name: /next criterion/i }));
    expect(onPrev).toHaveBeenCalledOnce();
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("disables prev when index is 0 and next when index is total - 1", () => {
    const { rerender } = render(
      <CriterionHeader
        criterion={sample}
        index={0}
        total={6}
        onPrev={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /prev criterion/i })).toBeDisabled();
    rerender(
      <CriterionHeader
        criterion={sample}
        index={5}
        total={6}
        onPrev={() => {}}
        onNext={() => {}}
      />,
    );
    expect(screen.getByRole("button", { name: /next criterion/i })).toBeDisabled();
  });
});
