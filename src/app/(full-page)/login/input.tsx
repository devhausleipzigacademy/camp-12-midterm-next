import React, { forwardRef } from "react";

type Props = {
  icon?: JSX.Element;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LoginInput = forwardRef<HTMLInputElement, Props>(
  ({ icon, error, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label className="px-5 py-3 bg-dark-light border-2 border-dark-light rounded-lg flex items-center gap-5 overflow-hidden focus-within:border-white-dimmed-heavy">
          {icon &&
            React.cloneElement(icon, {
              className: "h-6 w-auto text-white-dimmed",
            })}
          <input
            className="bg-transparent text-white flex-grow outline-none placeholder:text-white-dimmed"
            ref={ref}
            {...props}
          />
        </label>
      </div>
    );
  }
);

LoginInput.displayName = "LoginInput";
