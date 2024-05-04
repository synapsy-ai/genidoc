import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-500 to-sky-500 text-white border border-blue-400 hover:from-blue-500/90 hover:to-blue-500/90 shadow-md shadow-blue-500/30 hover:shadow-lg hover:shadow-blue-500/40 transition",
        destructive:
          "text-red-500 border border-transparent hover:border-red-500 hover:bg-red-500/10 dark:hover:bg-red-900/50",
        outline:
          "border border-slate-200 hover:border-slate-300 dark:hover:border-slate-600 bg-transparent hover:bg-slate-100/50 hover:text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800/50 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/20 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/20",
        ghost:
          "hover:bg-slate-100 border border-transparent hover:text-slate-900 dark:hover:bg-slate-800/50 dark:hover:text-slate-50 hover:border-slate-300 dark:hover:border-slate-600 ",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
