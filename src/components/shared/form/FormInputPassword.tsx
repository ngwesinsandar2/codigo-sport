import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
import InputPrefix from "./InputPrefix";

interface IFormInputPasswordProps<T> {
  fieldName: keyof T;
  label?: string;
  validation?: RegisterOptions;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInputPassword<T>({
  fieldName,
  label,
  validation,
  ...formInputProps
}: IFormInputPasswordProps<T>) {
  const formMethods = useFormContext();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Controller
      control={formMethods.control}
      rules={validation}
      name={String(fieldName)}
      render={({
        field: { onChange, ...fieldProps },
        fieldState: { error }
      }) => (
        <div>
          {label && (
            <FormLabel
              label={label}
              showAsterisk={!!validation?.required}
              id={String(fieldName)}
            />
          )}
          <InputPrefix
            id={String(fieldName)}
            type={showPassword ? "text" : "password"}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (formInputProps.onChange) {
                formInputProps.onChange(e);
              } else {
                onChange(e);
              }
            }}
            className="pr-[40px]"
            rightElement={
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <Eye /> : <EyeOff />}
                <span className="sr-only">toggle input type</span>
              </Button>
            }
            {...fieldProps}
            {...formInputProps}
          />
          {error?.message ? <FormError message={error?.message} /> : <></>}
        </div>
      )}
    />
  );
}
