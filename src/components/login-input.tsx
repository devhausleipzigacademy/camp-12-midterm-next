"use client";

import React from "react";

type Props = {
  icon: JSX.Element;
  placeholder: string;
  inputType: string;
  name: string;
};

export function LoginInput({ icon, placeholder, name, inputType }: Props) {
  return (
    <label className="px-5 py-3 bg-dark-light border-2 border-dark-light rounded-md flex items-center gap-5 overflow-hidden focus-within:border-white-dimmed-heavy">
      {React.cloneElement(icon, {
        className: "h-6 w-auto text-white-dimmed",
      })}
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        className="bg-transparent text-white flex-grow outline-none placeholder:text-white-dimmed"
      />
    </label>
  );
}
