import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "src/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant?: string;
  type?: HTMLInputTypeAttribute;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      children,
      className = "",
      type = "text",
      variant = "normal",
      ...attributes
    },
    ref
  ) => {
    return (
      <div className="group flex flex-col w-full relative">
        <input
          type={type}
          ref={ref}
          className={cn(
            `relative w-full inline-flex px-4 py-3 rounded-lg border-0 bg-white ring-1 focus-visible:border-0 outline-none ring-gray-200  focus:border-0  focus:ring-blue-600 ${className}`
          )}
          {...attributes}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
