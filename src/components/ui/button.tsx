import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
type Variant = "primary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";
const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-background hover:opacity-90", outline: "border border-border hover:bg-muted",
  ghost: "hover:bg-muted", danger: "bg-danger text-background hover:opacity-90",
};
const SIZES: Record<Size, string> = { sm: "h-9 px-3 text-sm", md: "h-11 px-4 text-sm", lg: "h-12 px-6 text-base" };
export const buttonStyles = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn("inline-flex items-center justify-center gap-2 rounded-lg font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50", VARIANTS[variant], SIZES[size], className);
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: Size }
export const Button = forwardRef<HTMLButtonElement, Props>(({ className, variant, size, ...rest }, ref) => (
  <button ref={ref} className={buttonStyles(variant, size, className)} {...rest} />
));
Button.displayName = "Button";
