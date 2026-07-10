import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md";
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans text-sm font-semibold tracking-wide uppercase transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary: "bg-terracotta text-cream hover:bg-maroon",
  outline: "border border-terracotta text-terracotta hover:bg-terracotta hover:text-cream",
  ghost: "text-charcoal hover:text-terracotta",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3.5",
};

export function buttonClasses(
  variant: ButtonProps["variant"] = "primary",
  size: ButtonProps["size"] = "md",
  className?: string,
) {
  return cn(base, variants[variant], sizes[size], className);
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  ),
);
Button.displayName = "Button";
