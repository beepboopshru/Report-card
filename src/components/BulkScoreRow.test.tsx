import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BulkScoreRow from "./BulkScoreRow";

const baseProps = {
  rollNo: "12",
  name: "Aanya Sharma",
  currentScore: 0,
  absent: false,
  focused: false,
  onScore: vi.fn(),
  onAbsent: vi.fn(),
  onFocus: vi.fn(),
};

describe("BulkScoreRow", () => {
  it("renders roll, name, and 1-4 buttons + absent", () => {
    render(<BulkScoreRow {...baseProps} />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Aanya Sharma")).toBeInTheDocument();
    for (const v of ["4", "3", "2", "1"]) {
      expect(screen.getByRole("button", { name: `Score ${v}` })).toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: /absent/i })).toBeInTheDocument();
  });

  it("calls onScore with the value when a score button is clicked", () => {
    const onScore = vi.fn();
    render(<BulkScoreRow {...baseProps} onScore={onScore} />);
    fireEvent.click(screen.getByRole("button", { name: "Score 3" }));
    expect(onScore).toHaveBeenCalledWith(3);
  });

  it("calls onAbsent when absent button clicked", () => {
    const onAbsent = vi.fn();
    render(<BulkScoreRow {...baseProps} onAbsent={onAbsent} />);
    fireEvent.click(screen.getByRole("button", { name: /absent/i }));
    expect(onAbsent).toHaveBeenCalledOnce();
  });

  it("shows a check when currentScore > 0", () => {
    render(<BulkScoreRow {...baseProps} currentScore={3} />);
    expect(screen.getByTestId("settled-check")).toBeInTheDocument();
  });

  it("shows a check when absent", () => {
    render(<BulkScoreRow {...baseProps} absent />);
    expect(screen.getByTestId("settled-check")).toBeInTheDocument();
  });

  it("applies focused styling when focused=true", () => {
    const { container } = render(<BulkScoreRow {...baseProps} focused />);
    expect(container.firstChild).toHaveAttribute("data-focused", "true");
  });
});
