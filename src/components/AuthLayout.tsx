import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-surface-sunken">
      {/* Brand panel */}
      <aside className="hidden md:flex flex-col justify-between w-1/2 lg:w-[45%] bg-accent-deep text-white p-12 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />
        <Link
          to="/"
          className="relative font-serif text-2xl inline-flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-md bg-white/15 inline-flex items-center justify-center text-sm font-sans font-semibold">
            SU
          </span>
          ScienceUtsav
        </Link>

        <div className="relative space-y-6 max-w-md">
          <h2 className="font-serif text-4xl leading-tight text-balance">
            One classroom.<br />Teachers and students.
          </h2>
          <ul className="space-y-3 text-white/85">
            {[
              "Teachers: score STEM kits and share PDF report cards.",
              "Students: work through robotics levels and take quizzes.",
              "One sign-in for everyone at ScienceUtsav.",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-good-200" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/60">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://beepboopshru.github.io/beepboopshru.github.io-nuoto/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            nuoto.ai
          </a>
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-sm">{children}</div>
      </main>
    </div>
  );
}
