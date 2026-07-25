export function categoryTone(category: string): "ok" | "accent" | "warn" {
  if (category === "Explorer") return "ok";
  if (category === "Robotics") return "warn";
  return "accent";
}
