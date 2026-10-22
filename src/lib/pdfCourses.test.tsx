import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { existsSync } from "node:fs";
import { LMS_LEVELS, levelSessions, lmsLevelPath } from "../../convex/lib/lmsCatalog";
import CourseAssignmentPicker from "../components/CourseAssignmentPicker";

describe("PDF course assignment", () => {
  it.each(["pmShri", "vjProjects"])("assigns %s as a whole course with a real PDF", (id) => {
    const level = LMS_LEVELS.find((entry) => entry.id === id)!;
    expect(levelSessions(level)).toEqual([]);
    expect(existsSync(`public${decodeURIComponent(lmsLevelPath(level))}`)).toBe(true);
    const onChange = vi.fn();
    const { rerender } = render(
      <CourseAssignmentPicker value={[]} onChange={onChange} levelIds={[id]} />,
    );
    fireEvent.click(screen.getByRole("checkbox", { name: level.name }));
    const assigned = [{ levelId: id, grades: ["all"] }];
    expect(onChange).toHaveBeenCalledWith(assigned);
    rerender(<CourseAssignmentPicker value={assigned} onChange={onChange} levelIds={[id]} />);
    expect(screen.queryByText("Class all")).toBeNull();
    expect(screen.queryByRole("button", { name: /Intro session/ })).toBeNull();
  });
});
