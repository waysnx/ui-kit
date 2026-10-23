import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Button } from "../src/components/Button";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend vitest's expect with jest-dom matchers
expect.extend(matchers);

describe("Button", () => {
  // Clean up DOM after each test
  afterEach(() => {
    cleanup();
  });
  it("renders with children text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with primary variant by default", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button).toHaveClass("wx-button");
    expect(button).toHaveClass("wx-button--primary");
  });

  it("renders with specified variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toHaveClass("wx-button--secondary");
  });

  it("invokes click handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: "Click me" });
    
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not invoke click handler when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    render(<Button onClick={handleClick} disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: "Disabled" });
    
    expect(button).toBeDisabled();
    
    await user.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className alongside default classes", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button", { name: "Custom" });
    
    expect(button).toHaveClass("wx-button");
    expect(button).toHaveClass("wx-button--primary");
    expect(button).toHaveClass("custom-class");
  });

  it("renders destructive variant correctly", () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("wx-button--destructive");
  });

  it("renders outline variant correctly", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole("button", { name: "Outline" });
    expect(button).toHaveClass("wx-button--outline");
  });

  it("renders ghost variant correctly", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole("button", { name: "Ghost" });
    expect(button).toHaveClass("wx-button--ghost");
  });
});
