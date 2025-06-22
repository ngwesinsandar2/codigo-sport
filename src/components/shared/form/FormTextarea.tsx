import { cn } from "@/lib/utils";
import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
import { Textarea } from "@/components/ui/textarea";

interface IFormTextareaProps<T>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  fieldName: keyof T;
  label?: string;
  validation?: RegisterOptions;
  onValueChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  containerClassName?: string;
  disabled?: boolean;
  placeholder?: string;
}

export default function FormTextarea<T>({
  fieldName,
  label,
  validation,
  containerClassName,
  disabled = false,
  placeholder,
  onValueChange,
  ...formInputProps
}: IFormTextareaProps<T>) {
  const formMethods = useFormContext();

  return (
    <Controller
      name={String(fieldName)}
      control={formMethods.control}
      rules={validation}
      render={({
        field: { onChange, ...fieldProps },
        fieldState: { error }
      }) => (
        <div className={cn(containerClassName)}>
          {label && (
            <FormLabel
              label={label}
              showAsterisk={!!validation?.required}
              id={String(fieldName)}
            />
          )}
          <Textarea
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (onValueChange) {
                onValueChange(e);
              } else {
                onChange(e);
              }
            }}
            {...fieldProps}
            {...formInputProps}
          />
          {error?.message ? <FormError message={error?.message} /> : <></>}
        </div>
      )}
    />
  );
}
