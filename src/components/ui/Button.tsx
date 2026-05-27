import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
  "inline-flex items-center justify-center gap-1.5 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed select-none",
  {
    variants: {
      variant: {
        primary:   "bg-accent text-white hover:bg-accent-deep",
        secondary: "bg-surface border border-line text-ink hover:bg-surface-muted",
        ghost:     "text-ink hover:bg-surface-muted",
        danger:    "bg-danger text-white hover:bg-danger/90",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-9 px-4 text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button> & { loading?: boolean };

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant, size, loading, disabled, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={button({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden
          className="w-3 h-3 rounded-full border-2 border-current border-r-transparent animate-spin"
        />
      )}
      {children}
    </button>
  );
});
