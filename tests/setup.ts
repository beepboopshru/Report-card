import "@testing-library/jest-dom/vitest";
import { Font } from "@react-pdf/renderer";

// In the jsdom test environment there is no real network, so fetching remote
// font URLs will throw.  Re-register the custom families used by the PDF
// components as standard PDF fonts so rendering never hits the network.
try {
  Font.register({ family: "DM Sans", src: "Helvetica" });
  Font.register({
    family: "DM Sans",
    fonts: [
      { src: "Helvetica" },
      { src: "Helvetica-Bold", fontWeight: 700 },
    ],
  });
  Font.register({ family: "DM Serif Display", src: "Times-Roman" });
} catch {
  // ignore
}
