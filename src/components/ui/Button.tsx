import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-navy)] text-[var(--color-ivory)] hover:bg-[var(--color-navy-ink)]",
  secondary:
    "bg-transparent text-[var(--color-navy)] border border-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-ivory)]",
  ghost:
    "bg-transparent text-[var(--color-navy)] hover:text-[var(--color-gold-deep)]",
};

// min-h-[44px] gives a comfortable iOS-grade tap target on mobile.
const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3 min-h-[44px] text-[12px] sm:text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-200 rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-ivory)]";

// Native button props minus the ones we control ourselves.
type NativeButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "className" | "children"
>;

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  NativeButtonProps & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = CommonProps & {
  as: "link";
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const className = `${base} ${variantStyles[variant]} ${props.className ?? ""}`;

  if (props.as === "link") {
    return (
      <Link href={props.href} className={className}>
        {props.children}
      </Link>
    );
  }

  // Pull off discriminator + our own style props so they never leak onto
  // the native <button>. React 19 / Next 16 are stricter — leaking
  // `variant` or `as` would surface as a DOM attribute warning (and in
  // some cases crash the render worker in dev). The discriminator narrow
  // above means TypeScript already knows `props` is ButtonAsButton here,
  // so no unsafe cast is needed.
  const {
    as: _as,
    variant: _variant,
    className: _className,
    children,
    ...buttonProps
  } = props;
  void _as;
  void _variant;
  void _className;

  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  );
}
