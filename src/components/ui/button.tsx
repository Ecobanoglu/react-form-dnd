import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "src/lib/utils";

export const ButtonVariants = cva(
  "inline-flex justify-center items-center rounded-lg text-base border-0 font-semibold cursor-pointer transition gap-x-2",
  {
    variants: {
      selected: {
        false: "bg-gray-200 text-gray-800",
        true: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
      },
      variant: {
        text: "bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-gray-800",
        primary: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
        man: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
        option: "bg-blue-500 text-white hover:bg-blue-600 hover:text-white",
        woman: "bg-pink-500 text-white hover:bg-pink-600 hover:text-white",
        link: "bg-transparent border-0 ring-0 text-current hover:text-primary-600 hover:underline",
        gray: `bg-gray-200 text-gray-800 hover:bg-gray-400 hover:text-gray-800`,
        error: "bg-red-600 text-white hover:bg-red-700 hover:text-white",

        info: "",
      },
      isDisabled: {
        false: "opacity-100",
        true: "appearance-none select-none cursor-not-allowed opacity-60",
      },

      size: {
        md: "py-3 px-4 lg:px-8",
        sm: "py-2 px-4",
        lg: "py-4 px-10",
        icon: "p-0 w-8 h-8 rounded-md",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      isDisabled: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  loading?: boolean;
  asChild?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = variant == "link" ? "none" : "md",
      loading = false,
      disabled = false,
      isDisabled = loading || disabled ? true : false,
      selected = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          ButtonVariants({ selected, variant, size, isDisabled, className })
        )}
        disabled={disabled || loading ? true : false}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
