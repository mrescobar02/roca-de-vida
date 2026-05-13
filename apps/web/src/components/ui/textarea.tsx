import * as React from "react";
import { cn } from "@rdv/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-label text-text-secondary">
            {label}
            {props.required && (
              <span className="text-gold ml-1" aria-label="requerido">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full min-h-[120px] px-4 py-3 resize-y",
            "font-body text-[0.9375rem] text-text-primary placeholder:text-text-muted",
            "bg-bg-raised border border-border rounded-xl",
            "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
            error && "border-red-700 focus:border-red-500 focus:ring-red-500/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors duration-150",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : hint
              ? `${textareaId}-hint`
              : undefined
          }
          {...props}
        />
        {hint && !error && (
          <p id={`${textareaId}-hint`} className="text-[0.8125rem] text-text-muted">
            {hint}
          </p>
        )}
        {error && (
          <p
            id={`${textareaId}-error`}
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
Textarea.displayName = "Textarea";

export { Textarea };
