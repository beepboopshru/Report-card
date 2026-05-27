import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "../../../src/components/ui/Button";

describe("Button", () => {
  it("renders children and is a button by default", () => {
    render(<Button>Save</Button>);
    const el = screen.getByRole("button", { name: "Save" });
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe("BUTTON");
  });

  it("applies the danger variant class", () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-danger");
  });

  it("renders a spinner and disables when loading", () => {
    render(<Button loading>Save</Button>);
    const el = screen.getByRole("button");
    expect(el).toBeDisabled();
    expect(el).toHaveAttribute("aria-busy", "true");
  });
});
