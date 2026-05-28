export function categoryTone(category: string): "ok" | "accent" {
  return category === "Explorer" ? "ok" : "accent";
}
