import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive uppercase tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-white text-block border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500 cursor-pointer",
        primary:
          "bg-blue-400 text-primary-foreground hover:bg-blue-400/90 border-blue-500 border-b-4 active:border-b-0 cursor-pointer",
        primaryOutline:
          "bg-transparent text-blue-400 border-blue-400 border-2 hover:bg-blue-400/10 cursor-pointer",
        
        secondary:
          "bg-green-400 text-primary-foreground hover:bg-green-400/90 border-green-500 border-b-4 active:border-b-0 cursor-pointer",
        secondaryOutline:
          "bg-transparent text-green-400 border-green-400 border-2 hover:bg-green-400/10 cursor-pointer",

        danger:
          "bg-red-400 text-primary-foreground hover:bg-red-400/90 border-red-500 border-b-4 active:border-b-0 cursor-pointer",
        dangerOutline:
          "bg-transparent text-red-400 border-red-400 border-2 hover:bg-red-400/10 cursor-pointer",

        super:
          "bg-indigo-400 text-primary-foreground hover:bg-indigo-400/90 border-indigo-500 border-b-4 active:border-b-0 cursor-pointer ",
        superOutline:
          "bg-transparent text-indigo-400 border-indigo-400 border-2 hover:bg-indigo-400/10 cursor-pointer",

        sidebar:
          "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        sidebarOutline:
          "bg-blue-500/15 text-blue-500 border-blue-300 border-2 hover:bg-blue-500/20 transitio-none",

        success:
          "bg-success text-white shadow-xs hover:bg-success/90 focus-visible:ring-success/20 dark:focus-visible:ring-success/40 dark:bg-success/60",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        
        ghost:
          "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4",
        icon: "h-10 w-10",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }