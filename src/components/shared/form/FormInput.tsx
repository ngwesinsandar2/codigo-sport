import { cn } from "@/lib/utils";
import React from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
import InputPrefix from "./InputPrefix";

interface IFormInputProps<T>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  fieldName: keyof T;
  label?: string;
  validation?: RegisterOptions;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  containerClassName?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export default function FormInput<T>({
  fieldName,
  label,
  validation,
  containerClassName,
  ...formInputProps
}: IFormInputProps<T>) {
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
          <InputPrefix
            id={String(fieldName)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (formInputProps.onChange) {
                formInputProps.onChange(e);
              } else {
                onChange(e);
              }
            }}
            type="text"
            {...fieldProps}
            {...formInputProps}
          />
          {error?.message ? <FormError message={error?.message} /> : <></>}
        </div>
      )}
    />
  );
}
