import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "../../../src/components/ui/FormField";
import { Input } from "../../../src/components/ui/Input";

describe("FormField", () => {
  it("links label, control, and error via aria", () => {
    render(
      <FormField label="Email" error="Required">
        {(id, describedBy) => <Input id={id} aria-describedby={describedBy} />}
      </FormField>,
    );
    const input = screen.getByLabelText("Email");
    const desc = input.getAttribute("aria-describedby");
    expect(desc).toBeTruthy();
    expect(screen.getByText("Required").id).toBe(desc);
  });

  it("omits aria-describedby when no error", () => {
    render(
      <FormField label="Name">
        {(id, describedBy) => <Input id={id} aria-describedby={describedBy} />}
      </FormField>,
    );
    expect(screen.getByLabelText("Name").getAttribute("aria-describedby")).toBeNull();
  });
});
