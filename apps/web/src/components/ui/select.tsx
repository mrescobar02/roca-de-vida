import * as React from "react";
import { cn } from "@rdv/utils";
import { ChevronDown } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-label text-text-secondary">
            {label}
            {props.required && (
              <span className="text-gold ml-1" aria-label="requerido">*</span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "w-full h-11 pl-4 pr-10 appearance-none",
              "font-body text-[0.9375rem] text-text-primary",
              "bg-bg-raised border border-border rounded-xl",
              "focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30",
              error && "border-red-700 focus:border-red-500",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-colors duration-150 cursor-pointer",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            size={16}
            strokeWidth={1.5}
          />
        </div>
        {error && (
          <p role="alert" className="text-[0.8125rem] text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
