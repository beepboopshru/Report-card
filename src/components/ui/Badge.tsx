import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const badge = cva(
  "inline-flex items-center gap-1 rounded-full font-medium leading-none whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-surface-muted text-ink-muted",
        accent: "bg-good-50 text-good-800",
        good: "bg-good-50 text-good-800",
        ok: "bg-ok-50 text-ok-800",
        warn: "bg-warn-50 text-warn-800",
        bad: "bg-bad-50 text-bad-800",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        md: "text-xs px-2.5 py-1",
      },
    },
    defaultVariants: { tone: "neutral", size: "md" },
  },
);

type Props = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badge>;

export function Badge({ tone, size, className, ...rest }: Props) {
  return <span className={badge({ tone, size, className })} {...rest} />;
}
