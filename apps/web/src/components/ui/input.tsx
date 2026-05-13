import * as React from "react";
import { cn } from "@rdv/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label text-text-secondary"
          >
            {label}
            {props.required && (
              <span className="text-gold ml-1" aria-label="requerido">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            // Layout
            "w-full h-11 px-4",
            // Tipografía
            "font-body text-[0.9375rem] text-text-primary placeholder:text-text-muted",
            // Fondo y borde
            "bg-bg-raised border border-border rounded-xl",
            // Focus
            "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
            // Error
            error && "border-red-700 focus:border-red-500 focus:ring-red-500/20",
            // Disabled
            "disabled:opacity-50 disabled:cursor-not-allowed",
            // Transición
            "transition-colors duration-150",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-[0.8125rem] text-text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-[0.8125rem] text-red-400"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
